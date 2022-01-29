export function isValidPrivateKey(pK){
    return (
        pK && typeof pK === 'string' &&
        pK.length && pK.length > 2 &&
        pK.substring(0,2) === "0x"
    );
}

export function isValidPublicKey(pubK){
    return (
        pubK && typeof pubK === 'string' &&
        pubK.length && pubK.length >= 2 &&
        pubK.substring(0,2) === "0x"
    );
}

export function isValidAddress(address){
    return (
        address && typeof address === 'string' &&
        address.length && address.length >= 2 &&
        address.substring(0,2) === "0x"
    );
}