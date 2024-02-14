import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { GrPowerReset } from "react-icons/gr";
function App() {
  const [caesarKey, setCaesarKey] = useState('');
  const [caesarText, setCaesarText] = useState('');
  const [result, setResult] = useState('');
  const notify = () => toast.info("Key hanya berupa kombinasi angka, dan plan text tidak boleh mengandung angka!'",{
    position: "top-center",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
  }); 

  function charToDec(a) {
    const i = a.charCodeAt(0);
    if (i >= 97 && i <= 122) {
      return i - 96;
    } else if (i >= 65 && i <= 90) {
      return i - 38;
    } else {
      return null;
    }
  }

  function decToChar(a) {
    if (a >= 1 && a <= 26) {
      return String.fromCharCode(a + 96);
    } else if (a >= 27 && a <= 52) {
      return String.fromCharCode(a + 38);
    } else {
      return null;
    }
  }

  function handleCaesarEncryptDecrypt(isEncrypt) {
    let key = parseInt(caesarKey, 10);
    if (isNaN(key)) {
      toast.error('Anda Belum Melakukan Input');
      return;
    }
    

    let text = caesarText;
    let result = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charDec = charToDec(char);

      if (charDec !== null) {
        let newCharDec;
        if (isEncrypt) {
          newCharDec = (charDec + key) > 52 ? (charDec + key - 52) : (charDec + key);
        } else {
          newCharDec = (charDec - key) < 1 ? (charDec - key + 52) : (charDec - key);
        }

        result += decToChar(newCharDec);
      } else {
        result += char;
      }
    }

    setResult(result);
  }
  return (
    <div className='row border rounded-5 p-3 bg-white box-area shadow-lg p-3 mb-5 bg-white rounded'>
     <h3 className='text-center'>Chipper Keamanan Sistem</h3>
      <fieldset>
        <legend><b>Caesar Cipter</b></legend>
        <input
          type="number"
          value={caesarKey}
          onChange={(e) => setCaesarKey(e.target.value)}
          placeholder="Masukkan Kunci"
          className="form-control shadow-sm p-3 mb-3 bg-white rounded"
          
        />
 <button onClick={notify}
 className='tombol rounded-circle BH'
 >?</button>

        <br />
        <input
          rows="4"
          value={caesarText}
          onChange={(e) => setCaesarText(e.target.value)}
          placeholder="Masukkan Plan Text"
          className="form-control shadow-sm p-3 mb-2 bg-white rounded"
        ></input>
        <br />
      </fieldset>
      <fieldset>
       <h4 className='text-center'>Hasil</h4>
        <input rows="4" value={result} disabled
        className='form-control'
        ></input>
        <br />
      </fieldset>
      <button onClick={() => handleCaesarEncryptDecrypt(true)}className='mb-3 rounded-pill'><p className='BH'>Encrypt</p></button>
        <button onClick={() => handleCaesarEncryptDecrypt(false)}className='mb-3 rounded-pill '><p className='BH'>Decrypt</p></button>
        <button onClick={() => setCaesarKey('') || setCaesarText('') || setResult('')}  className='ml-3 rounded-pill' ><p className='BH'><GrPowerReset /></p></button>
      <ToastContainer 
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </div>
  );
}

export default App;
