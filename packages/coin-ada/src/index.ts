/* eslint-disable no-param-reassign */
import { coin as COIN, Transport, utils, config } from '@coolwallet/core';
import {
  accountKeyToAddress,
  derivePubKeyFromAccountToIndex,
  cborEncode,
  genInputs,
  genOutputs,
  genFee,
  genTtl,
} from './utils';
import { Options, TransferWithoutFee, Transfer } from './config/types';
import { signTransaction } from './sign';

export default class ADA implements COIN.Coin {

  // implement this because of not extending ECDSACoin
  async getAccountPubKey(transport: Transport, appPrivateKey: string, appId: string): Promise<string> {
    const pathType = config.PathType.BIP32ED25519;
    const pathString = "1852'/1815'/0'";
    const path = utils.getFullPath({ pathType, pathString });
    const pubkey = await COIN.getPublicKeyByPath(transport, appId, appPrivateKey, path);
    return pubkey;
  }

  getAddressByAccountKey(accPublicKey: string, addressIndex: number): string {
    const accPublicKeyBuff = Buffer.from(accPublicKey, 'hex');
    const address = accountKeyToAddress(accPublicKeyBuff, addressIndex);
    return address;
  }

  async getAddress(transport: Transport, appPrivateKey: string, appId: string, addressIndex: number): Promise<string> {
    const accPubKey = await this.getAccountPubKey(transport, appPrivateKey, appId);
    const address = this.getAddressByAccountKey(accPubKey, addressIndex);
    return address;
  }

  getTransactionSize(transaction: TransferWithoutFee): number {
    const { inputs, output, change, ttl } = transaction;
    let tx = '83a4';
    tx += genInputs(inputs);
    tx += genOutputs(output, change);
    tx += genFee();
    tx += genTtl(ttl);
    console.log('tx :', tx);
    return tx.length / 2;
  }

  async signTransaction(
    transaction: Transfer,
    options: Options
  ): Promise<string> {
    const { transport, appPrivateKey, appId, confirmCB, authorizedCB } = options;
    const { inputs, output, change, fee, ttl } = transaction;


    return signTransaction(transaction, options);
  }
}
