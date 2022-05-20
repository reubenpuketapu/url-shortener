import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import './App.css';
import { useListUrls } from '../../hooks/UrlApiHooks';

export const App = () => {
  const [url, setUrl] = useState<string>('');
  const { data: listData, loaded: listLoaded, refetch} = useListUrls();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try{
        await axios.post('http://localhost/urls', {url: url});  
      }
      catch(error: any){
        if (error instanceof AxiosError && error.response?.status === 400){
         alert('invalid url');
        }
      }
      refetch();      
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(e.target.value);
  };

  const showLoading = () => (!listLoaded ? <div className="alert alert-info">Loading...</div> : '');

  const existingUrls = () => {
      return listData.map((x, index) => {
          return <div key={index}>
            <span>{x.url} &nbsp; &nbsp; &nbsp; &nbsp; {x.short}</span>
          </div>
        })
      };

  const signupForm = () => {
    return (
        <form onSubmit={(e) => {handleSubmit(e)}}>
          <div className="form-group">
            <input
                value={url}
                onChange={(input) => handleChange(input)}
                type="text"
                className="form-control"
                placeholder="convert your url"
            />
            <button>
              Submit
            </button>
          </div>
        </form>);
  }

  return (<div className="App-header">
      {showLoading()}
      {existingUrls()}
      {signupForm()}
    </div>
   
  );
}