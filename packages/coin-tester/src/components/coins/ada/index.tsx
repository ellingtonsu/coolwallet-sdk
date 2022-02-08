import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Transport, apdu, utils, config } from '@coolwallet/core';
import { NoInput, ObjInputs } from '../../../utils/componentMaker';

import ADA, { TransferWithoutFee, Options } from '@coolwallet/ada';

interface Props {
  transport: Transport | null,
  appPrivateKey: string,
  appPublicKey: string,
  isLocked: boolean,
  setIsLocked: (isLocked:boolean) => void,
}

// const txWithoutFee = {
//   addrIndexes: [0],
//   inputs: [{
//     txId: '0x8561258e210352fba2ac0488afed67b3427a27ccf1d41ec030c98a8199bc22ec',
//     index: 0,
//   }],
//   output: {
//     address: 'addr1qxn5anyxv6dhtl57yvgvpp25emy0pc9wenqzzemxktyr94ahaaap0f0tn4wxaqsydnzty2m0y4gfeu39ckjvsjycs4nssxhc25',
//     amount: 10523059,
//   },
//   change: {
//     address: 'addr1q8wyqhxud34ejxjm5tyj74qeuttr7z9vnjuxy6upyn2w8ryau3fvcuaywgncvz89verfyy24vverl9pw2h5uwv30aq9qm6xj7s',
//     amount: 360000,
//   },
//   ttl: '0x641a5',
// };

function CoinAda(props: Props) {
  const { transport, appPrivateKey } = props;
  const disabled = !transport || props.isLocked;
  const ada = new ADA();

  // 0. Address
  const [address, setAddress] = useState('');

  // 1. Transfer Tx
  const [transferTxKeys, setTransferTxKeys] = useState([
    'Address Index',
    'Transaction ID',
    'UTXO Index',
    'To Address',
    'To Amount',
    'Change Address',
    'Change Amount',
    'Time to Live',
  ]);
  const [transferTxValues, setTransferTxValues] = useState([
    '0',
    '0x8561258e210352fba2ac0488afed67b3427a27ccf1d41ec030c98a8199bc22ec',
    '0',
    'addr1qxn5anyxv6dhtl57yvgvpp25emy0pc9wenqzzemxktyr94ahaaap0f0tn4wxaqsydnzty2m0y4gfeu39ckjvsjycs4nssxhc25',
    '10523059',
    'addr1q8wyqhxud34ejxjm5tyj74qeuttr7z9vnjuxy6upyn2w8ryau3fvcuaywgncvz89verfyy24vverl9pw2h5uwv30aq9qm6xj7s',
    '360000',
    '0x641a5',
  ]);
  const [transferTxSize, setTransferTxSize] = useState('');
  const [transferTx, setTransferTx] = useState('');

  const handleState = async (
    request: () => Promise<string>,
    handleResponse: (response: string) => void
  ) => {
    props.setIsLocked(true);
    try {
      const response = await request();
      handleResponse(response);
    } catch (error: any) {
      handleResponse(error.message);
      console.error(error);
    } finally {
      props.setIsLocked(false);
    }
  };

  const getAddress = async () => {
    handleState(async () => {
      const appId = localStorage.getItem('appId');
      if (!appId) throw new Error('No Appid stored, please register!');
      const address = await ada.getAddress(transport!, appPrivateKey, appId, 0);
      return address;
    }, setAddress);
  };

  const genTransferTxWithoutFee = () => {
    const [addrIndex, txId, index, address, amount, changeAddress, changeAmount, ttl] = transferTxValues;
    const tx: TransferWithoutFee = {
      addrIndexes: [addrIndex],
      inputs: [{
        txId,
        index,
      }],
      output: {
        address,
        amount,
      },
      ttl,
    };
    if (parseInt(changeAmount) > 0) tx.change = {
      address: changeAddress,
      amount: changeAmount,
    };
    return tx;
  };

  const getTransferTxSize = async () => {
    handleState(async () => {
      const size = await ada.getTransactionSize(genTransferTxWithoutFee());
      console.log('size :', size);
      return size.toString();
    }, setTransferTxSize);
  };

  const signTransferTx = async () => {
    handleState(async () => {
      const transaction = {
        fee: 0x28d05,
        ...genTransferTxWithoutFee()
      };

      const appId = localStorage.getItem('appId');
      if (!appId) throw new Error('No Appid stored, please register!');
      const options = {
        transport: transport!,
        appPrivateKey,
        appId
      };

      const signedTx = await ada.signTransaction(transaction, options);
      return signedTx;
    }, setTransferTx);
  };

  return (
    <Container>
      <div className='title2'>0. Address</div>
      <NoInput
        title='Get Address'
        content={address}
        onClick={getAddress}
        disabled={disabled}
      />
      <div className='title2'>1. Transfer Tx</div>
      <ObjInputs
        title='Transfer Tx Size'
        content={transferTxSize}
        onClick={getTransferTxSize}
        disabled={disabled}
        keys={transferTxKeys}
        values={transferTxValues}
        setValues={setTransferTxValues}
        btnName='Calculate'
      />
      <NoInput
        title='Sign Transfer Tx'
        content={transferTx}
        onClick={signTransferTx}
        disabled={disabled}
        btnName='Sign'
      />
      <div className='title2'>2. Stake Register Tx</div>
    </Container>
  );
}

export default CoinAda;
