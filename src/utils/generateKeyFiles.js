const generateFileName = (entityName, prefix) => {
    return prefix + entityName.split(' ').slice(0,2).join('-') + ".txt";
}

function downloadFile(text, fileName){
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
}

export const generateKeyFile = (entityName, key) =>{
    let text = "Private key:   " + key;
    text += "\n\nYou should use this to login, Don't share with anyone !!!!!";
    downloadFile(text, generateFileName(entityName, "Key_"));
}
export const generateAddressFile = (entityName, address) =>{
    let text = "Address:   " + address;
    text += "\n\nYou must share this with your doctors/hospital to facilitate your medical service :)";
    downloadFile(text, generateFileName(entityName, "Address_"));
}