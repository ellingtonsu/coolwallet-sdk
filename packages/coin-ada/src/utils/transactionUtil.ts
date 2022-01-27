import { bech32 } from 'bech32';
import { BigNumber } from '@ethersproject/bignumber';
import { MajorType, Integer, Input, Output } from '../config/types';

export const decodeAddress = (address: string): Buffer => {
  const words = bech32.decode(address, 150).words;
  const addressBuff = Buffer.from(bech32.fromWords(words));
  return addressBuff;
};

export const cborEncode = (majorType: MajorType, value: Integer): string => {
  const bn = BigNumber.from(value);

  let prefix = majorType << 5;
  let argument = '';
  if (bn.gt('0xffffffffffffffff')) {
    throw new Error('value is over support');
  } else if (bn.gt('0xffffffff')) {
    prefix += 27;
    argument = bn.toHexString().substr(2).padStart(16, '0');
  } else if (bn.gt('0xffff')) {
    prefix += 26;
    argument = bn.toHexString().substr(2).padStart(8, '0');
  } else if (bn.gt('0xff')) {
    prefix += 25;
    argument = bn.toHexString().substr(2);
  } else if (bn.gte('0x18')) {
    prefix += 24;
    argument = bn.toHexString().substr(2);
  } else {
    prefix += bn.toNumber();
  }
  const result = prefix.toString(16).padStart(2, '0') + argument;
  return result;
};

export const genInputs = (inputs: Input[]): string => {
  let result = '00' + cborEncode(MajorType.Array, inputs.length);
  for (let { txId, index } of inputs) {
    txId = txId.startsWith('0x') ? txId.substr(2) : txId;
    if (txId.length != 64) throw new Error('txId length is invalid');
    result += '825820' + txId + cborEncode(MajorType.Uint, index);
  }
  return result;
};

export const genOutputs = (output: Output, change?: Output): string => {
  const outputCount = change ? 2 : 1;
  let result = '01' + cborEncode(MajorType.Array, outputCount);
  // output
  result += '82';
  const addressBuff = decodeAddress(output.address);
  result += cborEncode(MajorType.Byte, addressBuff.length);
  result += addressBuff.toString('hex');
  result += cborEncode(MajorType.Uint, output.amount)
  // change
  if (change) {
    result += '82';
    const addressBuff = decodeAddress(change.address);
    result += cborEncode(MajorType.Byte, addressBuff.length);
    result += addressBuff.toString('hex');
    result += cborEncode(MajorType.Uint, change.amount)
  }
  return result;
};

export const genFee = (value = 170000): string => {
  let result = '02';
  result += cborEncode(MajorType.Uint, value);
  return result;
};

export const genTtl = (value: Integer = 0): string => {
  let result = '03';
  result += cborEncode(MajorType.Uint, value);
  return result;
};

