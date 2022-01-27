const bip32Edd25519 = require('bip32-ed25519');
const blake2b = require('blake2b');
import { bech32 } from 'bech32';

export const derivePubKeyFromAccountToIndex = (accountPubKey: Buffer, roleIndex = 0, index = 0) => {
  const rolePubKey = bip32Edd25519.derivePublic(accountPubKey, roleIndex);
  return bip32Edd25519.derivePublic(rolePubKey, index).slice(0, 32);
};

export const blake2b224 = (input: Buffer) => {
  return Buffer.from(blake2b(28).update(input).digest());
};

export const accountKeyToAddress = (accPubkey: Buffer, addrIndex: number) => {
  const paymentPubKey = derivePubKeyFromAccountToIndex(accPubkey, 0, addrIndex);
  const stakePubKey = derivePubKeyFromAccountToIndex(accPubkey, 2, 0);

  const paymentHash = blake2b224(paymentPubKey);
  const stakeHash = blake2b224(stakePubKey);

  const addressBuff = Buffer.concat([
    Buffer.allocUnsafe(1).fill(0x01),
    paymentHash,
    stakeHash
  ]);
  const words = bech32.toWords(addressBuff);
  const address = bech32.encode('addr', words, 200);
  return address;
};

export {
  decodeAddress,
  cborEncode,
  genInputs,
  genOutputs,
  genFee,
  genTtl
} from './transactionUtil';

export {
  getTransferArgument
} from './scriptUtil';
