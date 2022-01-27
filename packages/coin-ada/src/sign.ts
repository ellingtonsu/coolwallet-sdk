import { apdu, tx } from '@coolwallet/core';
import { Options, Transfer } from './config/types';
import { getTransferArgument } from './utils';
import * as params from './config/params';

export async function signTransaction(
  transaction: Transfer,
  options: Options,
): Promise<string> {
  const { transport, appPrivateKey, appId, confirmCB, authorizedCB } = options;
  const { inputs, output, change, fee, ttl } = transaction;

  const script = params.TRANSFER.script + params.TRANSFER.signature;
  const args = await getTransferArgument(transaction);

  const encryptedSigs = [];
  for (let arg of args) {
    await apdu.tx.sendScript(transport, script);
    const sig = await apdu.tx.executeScript(transport, appId, appPrivateKey, arg);
    encryptedSigs.push(sig);
  }

  await apdu.tx.finishPrepare(transport);
  await apdu.tx.getTxDetail(transport);
  const decryptingKey = await apdu.tx.getSignatureKey(transport);

  let sigs = [];
  for (let encryptedSig of encryptedSigs) {
    if (!encryptedSig) throw new Error('encryptedSig is invalid');
    const sig = tx.util.decryptSignatureFromSE(encryptedSig, decryptingKey);
    sigs.push(sig);
  }

  await apdu.tx.clearTransaction(transport);
  await apdu.mcu.control.powerOff(transport);


  const signedTx = '';
  //const transaction = txUtil.composeFinalTransaction(redeemScriptType, preparedData, signatures as Buffer[]);
  return signedTx;
}
