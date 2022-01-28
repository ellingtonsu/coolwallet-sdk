import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Transport, apdu, utils, config } from '@coolwallet/core';
import { NoInput, TwoInputs } from '../../../utils/componentMaker';

import ADA, { TransferWithoutFee, Options } from '@coolwallet/ada';

interface Props {
  transport: Transport | null,
  appPrivateKey: string,
  appPublicKey: string,
  isLocked: boolean,
  setIsLocked: (isLocked:boolean) => void,
}

const txWithoutFee = {
  signers: [{
    rolePath: 0,
    indexPath: 0,
  }],
  inputs: [{
    txId: '0x8561258e210352fba2ac0488afed67b3427a27ccf1d41ec030c98a8199bc22ec',
    index: 0,
  }],
  output: {
    address: 'addr1qxn5anyxv6dhtl57yvgvpp25emy0pc9wenqzzemxktyr94ahaaap0f0tn4wxaqsydnzty2m0y4gfeu39ckjvsjycs4nssxhc25',
    amount: 10523059,
  },
  change: {
    address: 'addr1q8wyqhxud34ejxjm5tyj74qeuttr7z9vnjuxy6upyn2w8ryau3fvcuaywgncvz89verfyy24vverl9pw2h5uwv30aq9qm6xj7s',
    amount: 360000,
  },
  ttl: '0x641a5',
};

function CoinAda(props: Props) {
  const ada = new ADA();
  const [address, setAddress] = useState('');
  const [transferSize, setTransferSize] = useState('');
  const [transferTx, setTransferTx] = useState('');
  const [signedTransaction, setSignedTransaction] = useState('');
  const [value, setValue] = useState('0');
  const [to, setTo] = useState('0x81bb32e4A7e4d0500d11A52F3a5F60c9A6Ef126C');

  const { transport, appPrivateKey } = props;
  const disabled = !transport || props.isLocked;

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

  const getTransferSize = async () => {
    handleState(async () => {
      const size = await ada.getTransactionSize(txWithoutFee);
      console.log('size :', size);
      return size.toString();
    }, setTransferSize);
  };

  const signTransaction = async () => {
    handleState(async () => {
      const transaction = {
        fee: 0x28d05,
        ...txWithoutFee
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
      <div className='title2'>
        These two basic methods are required to implement in a coin sdk.
      </div>
      <NoInput
        title='Get Address'
        content={address}
        onClick={getAddress}
        disabled={disabled}
      />
      <NoInput
        title='Get Transfer Size'
        content={transferSize}
        onClick={getTransferSize}
        disabled={disabled}
      />
      <NoInput
        title='Sign Transfer'
        content={transferTx}
        onClick={signTransaction}
        disabled={disabled}
      />
      <TwoInputs
        title='not used'
        content={signedTransaction}
        onClick={signTransaction}
        disabled={disabled}
        btnName='Sign'
        value={value}
        setValue={setValue}
        placeholder='value'
        inputSize={1}
        value2={to}
        setValue2={setTo}
        placeholder2='to'
        inputSize2={3}
      />
    </Container>
  );
}

export default CoinAda;
