import React, { useState } from 'react';
import './App.css';
import { InvalidUrlError, useUrlsApi } from '../../hooks/UrlApiHooks';

export interface AppProps {
  apiUrl: string
}

export const App = (props: AppProps) => {
  const [url, setUrl] = useState<string>('');
  const { data: listData, loaded: listLoaded, addUrl, refetch } = useUrlsApi(props.apiUrl);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      await addUrl(url);
    }
    catch(error)
    {
      if (error instanceof InvalidUrlError){
        alert('Invalid Url')
      }
    }

    refetch();
    setUrl('');
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
      <form onSubmit={(e) => { handleSubmit(e) }}>
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