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

  const preActions = [];

  const script = params.TRANSFER.script + params.TRANSFER.signature;
  const sendScript = async () => {
    await apdu.tx.sendScript(transport, script);
  };
  preActions.push(sendScript);

  const fullArguments = await getTransferArgument(transaction);
  const sendArgument = async () => {
    await apdu.tx.executeScript(transport, appId, appPrivateKey, argument);
  };

  const signatures = await tx.flow.getSingleSignatureFromCoolWallet(
    transport,
    preActions,
    sendArgument,
    false,
    confirmCB,
    authorizedCB,
    false
  );

  const signedTx = '';
  //const transaction = txUtil.composeFinalTransaction(redeemScriptType, preparedData, signatures as Buffer[]);
  return signedTx;
}
