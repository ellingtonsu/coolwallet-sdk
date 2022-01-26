import { utils, config } from '@coolwallet/core';
import { Output, Transfer } from '../config/types';
import { handleHex } from './stringUtil';
import { decodeAddress } from './index';

const getFullPath = (roleIndex: number, addressIndex: number) => {
  var pathString = "1852'/1815'/0'";
  pathString = pathString + '/' + roleIndex;
    pathString = pathString + '/' + addressIndex;
  return utils.getFullPath({
    pathType: config.PathType.BIP32ED25519,
    pathString: pathString,
  });
};

const getOutputArgument = (output: Output) => {
  const argument = '';
};

export const getTransferArgument = (
  transaction: Transfer
): string[] => {
  const { signers, inputs, output, change, fee, ttl } = transaction;

  const argument =
    signTxData.change.pubkeyBuf.toString('hex') +
    getPrefix(signTxData.change.value) +
    signTxData.change.value.padStart(16, '0') +
    decodeAddress(signTxData.output.address).addressBuff.slice(1, 65).toString('hex') +
    getPrefix(signTxData.output.value) +
    signTxData.output.value.padStart(16, '0') +
    getPrefix(signTxData.fee) +
    signTxData.fee.padStart(16, '0') +
    getPrefix(signTxData.invalidHereafter.toString(16)) +
    signTxData.invalidHereafter.toString(16).padStart(16, '0') +
    inputs;

  const fullArguments = signers.map((signer) => {
    const { rolePath, indexPath } = signer;
    const fullPath = utils.getFullPath({
      pathType: config.PathType.BIP32ED25519,
      pathString: `1852'/1815'/0'/${rolePath}/${indexPath}`,
    });
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
