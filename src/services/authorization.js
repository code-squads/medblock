import React, { createContext, useState, useEffect } from "react";
import web3 from './web3';

import { universalLogin } from '../apis/medblock';
import { isValidAddress, isValidPrivateKey } from '../utils/keyValidator';
import { isValidAuthority } from '../utils/authorityTypesValidator';

const AuthContext = createContext({});

const AuthProvider = (props) => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [wallet, setWallet] = useState(undefined);
  const [authority, setAuthority] = useState(undefined);
  const [entityInfo, setEntityInfo] = useState(undefined);

  useEffect(() => {
    // Pull saved login state from localStorage
    const pk = localStorage.getItem('pk');
    const expectedAddress = localStorage.getItem('address');
    const authorityType = localStorage.getItem('authorityType');

    if(!isValidPrivateKey(pk)){
      console.log("Private key in localstorage is not valid !!!");
      console.log("Resetting the localstorage for security reasons, login again please :)");
      localStorage.clear();
      return false;
    }

    if(!isValidAddress(expectedAddress)){
      console.log("Address in localstorage is not valid !!!");
      console.log("Resetting the localstorage for security reasons, Login again please :)");
      localStorage.clear();
      return false;
    }

    if(!isValidAuthority(authorityType)){
      console.log("Localstorage compromised !!!");
      console.log("Resetting the localstorage for security reasons, Login again please :)");
      localStorage.clear();
      return false;
    }

    // Create new wallet from previous session's private key
    web3.eth.accounts.wallet.clear();
    const newWallet = web3.eth.accounts.privateKeyToAccount(pk);

    // Verify that previous session's address matches newly generated wallet's address
    if(newWallet.address !== expectedAddress){
      console.log("Local storage credentials compromised !!!!!");
      console.log("Reason: NON-MATCHING ADDRESS");
      console.log("Local storage address(expected):\n", localStorage.getItem('address'));
      console.log("But, generated wallet address:\n", newWallet.address);  
      console.log("Resetting the localstorage for security reasons, login again please :)");
      localStorage.clear();
      return;
    }

    console.log("Wallet created from existing private key:", newWallet);

    universalLogin(pk, authorityType)
      .then(info => {
        web3.eth.accounts.wallet.add(newWallet);

        // Update login status in the context
        setWallet(web3.eth.accounts.wallet[0]);
        setEntityInfo(info);
        setAuthority(authorityType);
        setLoggedIn(true);

        console.log("Initial login successful with following response: ", info);
        console.log("Logged in as: ", authorityType);
      }).catch(err => {
          console.log("Logging in from saved credentials failed, Resetting localstorage !!");
          localStorage.clear();
          console.log(err);
      })    
  }, []);


  const login = (pk, authorityType, entityInfo) => {
    if(loggedIn){
      console.log("Already logged in !");
      return false;
    }

    // Clear any residue private keys from the account in web3 & localstorage
    web3.eth.accounts.wallet.clear();
    localStorage.clear();

    // Create new wallet from private key
    web3.eth.accounts.wallet.add(web3.eth.accounts.privateKeyToAccount(pk));
    console.log("New wallet created:", web3.eth.accounts.wallet[0]);

    // Store private key locally for automatic login in future sessions
    localStorage.setItem('pk', pk);

    // Store address to detect compromised private key in local storage
    localStorage.setItem('address', web3.eth.accounts.wallet[0].address);

    // Store authority type of the entity currently logged in
    localStorage.setItem('authorityType', authorityType);

    // Update login status in the context
    setWallet(web3.eth.accounts.wallet[0]);
    setEntityInfo(entityInfo);
    setAuthority(authorityType);
    setLoggedIn(true);

    return true;
  };


  const logout = () => {
    if(!loggedIn){
      console.log("Already logged out !");
      return false;
    }

    // Clear web3 wallet
    web3.eth.accounts.wallet.clear();

    // Remove stored private key & address from local storage
    localStorage.removeItem('pk');
    localStorage.removeItem('address');
    localStorage.removeItem('authorityType');

    // Update login status in the context
    setWallet(undefined);
    setEntityInfo(undefined);
    setAuthority(undefined);
    setLoggedIn(false);

    return true;
  };


  const contextValue = {
    loggedIn,
    authority,
    entityInfo,
    wallet,
    login,
    logout
  };

  return <AuthContext.Provider value={contextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };