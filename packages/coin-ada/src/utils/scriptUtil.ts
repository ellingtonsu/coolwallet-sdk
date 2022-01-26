import { utils, config } from '@coolwallet/core';
import { MajorType, Output, Transfer } from '../config/types';
import { handleHex } from './stringUtil';
import { decodeAddress, cborEncode } from './transactionUtil';

const getFullPath = (rolePath: number, indexPath: number) => {
  const fullPath = utils.getFullPath({
    pathType: config.PathType.BIP32ED25519,
    pathString: `1852'/1815'/0'/${rolePath}/${indexPath}`,
  });
  return fullPath;
};

const getUintArgument = () => {
};

const getOutputArgument = (output?: Output) => {
  if (!output) return '0'.repeat(136);
  const addressBuff = decodeAddress(output.address);
  const addressLength = addressBuff.length.toString(16).padStart(2, '0');
  const address = addressBuff.toString('hex').padEnd(114, '0');
  const amount = cborEncode(MajorType.Uint, output.amount);
  const amountLength = (amount.length/2-1).toString(16).padStart(2, '0');
  return addressLength + address + amountLength + amount.padEnd(18, '0');
};

export const getTransferArgument = (
  transaction: Transfer
): string[] => {
  const { signers, inputs, output, change, fee, ttl } = transaction;

  const argument = getOutputArgument(change) + getOutputArgument(output)

  const fullArguments = signers.map((signer) => {
    const { rolePath, indexPath } = signer;
    const fullPath = getFullPath(rolePath, indexPath);
    return `15${fullPath}${argument}`;
  });
  return fullArguments;
};

export const getPrefix = (input: string): string => {
  const buf = Buffer.from(handleHex(input), 'hex');
  if (buf.length <= 2) {
    return '18';
  } else if (buf.length <= 4) {
    return '19';
  } else if (buf.length <= 8) {
    return '1a';
  } else {
    return '1b';
  }
};
