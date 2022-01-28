import { utils, config } from '@coolwallet/core';
import { MajorType, Integer, Output, Witness, Transfer } from '../config/types';
import {
  derivePubKeyFromAccountToIndex,
  decodeAddress,
  cborEncode,
  genInputs,
} from './index';

const getFullPath = (rolePath: number, indexPath: number) => {
  const fullPath = utils.getFullPath({
    pathType: config.PathType.BIP32ED25519,
    pathString: `1852'/1815'/0'/${rolePath}/${indexPath}`,
  });
  return fullPath;
};

const getUintArgument = (value: Integer) => {
  const data = cborEncode(MajorType.Uint, value);
  const length = (data.length/2-1).toString(16).padStart(2, '0');
  return length + data.padEnd(18, '0');
};

const getOutputArgument = (output?: Output) => {
  if (!output) return '0'.repeat(136);
  const addressBuff = decodeAddress(output.address);
  const addressLength = addressBuff.length.toString(16).padStart(2, '0');
  const address = addressBuff.toString('hex').padEnd(114, '0');
  const amount = getUintArgument(output.amount);
  return addressLength + address + amount;
};

export const getTransferArgument = (
  transaction: Transfer,
  accPubkey: string,
): Witness[] => {
  const { signers, inputs, output, change, fee, ttl } = transaction;
  const accPubkeyBuff = Buffer.from(accPubkey, 'hex');

  const argument = getOutputArgument(change)
    + getOutputArgument(output)
    + getUintArgument(fee)
    + getUintArgument(ttl)
    + genInputs(inputs);

  const witnesses = signers.map((signer) => {
    const { rolePath, indexPath } = signer;
    const vkey = derivePubKeyFromAccountToIndex(
      accPubkeyBuff,
      rolePath,
      indexPath
    ).toString('hex');
    const sig = '';
    const fullPath = getFullPath(rolePath, indexPath);
    return { arg: `15${fullPath}${argument}`, vkey, sig };
  });

  return witnesses;
};

