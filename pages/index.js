import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const initialKey = {
    id: uuidv4(),
    title: "",
    cpa: "",
    cda: "",
    space: "",
    token: "",
  };
  const initialConfig = {
    keys: [],
    key: initialKey,
    addEntry: false,
  };
  const [config, setConfig] = useState(initialConfig);
  const {
    addEntry,
    keys,
    key: { title, cpa, cda, space, token },
  } = config;
  useEffect(() => {
    const hasData = localStorage?.getItem("keyPassData");
    const setConfigData = hasData ? JSON.parse(hasData) : initialConfig;
    setConfig(setConfigData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, space, cpa, cda, token } = e.target.elements || {};
    const validData = Boolean(
      title?.value?.trim() &&
        space?.value?.trim() &&
        cpa?.value?.trim() &&
        cda?.value?.trim() &&
        token?.value?.trim()
    );
    if (validData) {
      setConfig((prevState) => {
        return {
          ...prevState,
          keys: prevState.keys.concat(prevState.key),
          key: initialKey,
          addEntry: false,
        };
      });
    } else {
      alert("Please enter a valid entry.");
    }
  };
  const handleAddSite = () => {
    setConfig((prevState) => {
      return {
        ...prevState,
        addEntry: !prevState.addEntry,
      };
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prevState) => {
      return {
        ...prevState,
        key: {
          ...prevState.key,
          [name]: value,
        },
      };
    });
  };
  const handleSave = (newConfig) => {
    const saveThis = newConfig || config;
    console.log("save", saveThis, newConfig, config);
    localStorage?.setItem("keyPassData", JSON.stringify(saveThis));
  };
  const handleClear = () => {
    localStorage?.removeItem("keyPassData");
    setConfig(initialConfig);
  };
  const handleExport = () => {
    alert(JSON.stringify(config));
  };
  const handleImport = () => {
    const data = prompt("Please enter exported config data.");
    if (!data) return;
    setConfig(JSON.parse(data));
    handleSave(JSON.parse(data));
  };
  return (
    <div className={styles.app}>
      <Head>
        <title>Contentful KeyPass</title>
        <meta
          name="description"
          content="Contentful KeyPass is a tool to assist web developers who work with Contentful sites on a daily basis."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.grid}>
        <header>
          Contentful KeyPass is a tool to assist web developers who work with
          Contentful sites on a daily basis.
        </header>
        <div className={styles.buttons}>
          <button onClick={handleAddSite}>+ Add Site</button>
          <button onClick={() => handleSave()}>Save</button>
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleImport}>Import</button>
          <button onClick={handleExport}>Export</button>
        </div>
        {addEntry && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                onChange={handleChange}
                value={title}
                placeholder="Title"
                required
              />
            </div>
            <div className={styles.group}>
              <label htmlFor="space">SpaceID</label>
              <input
                id="space"
                name="space"
                onChange={handleChange}
                value={space}
                placeholder="SpaceID"
                required
              />
            </div>
            <div className={styles.group}>
              <label htmlFor="cpa">CPA</label>
              <input
                id="cpa"
                name="cpa"
                onChange={handleChange}
                value={cpa}
                placeholder="CPA"
                required
              />
            </div>
            <div className={styles.group}>
              <label htmlFor="cda">CDA</label>
              <input
                id="cda"
                name="cda"
                onChange={handleChange}
                value={cda}
                placeholder="CDA"
                required
              />
            </div>
            <div className={styles.group}>
              <label htmlFor="token">Access Token</label>
              <input
                id="token"
                name="token"
                onChange={handleChange}
                value={token}
                placeholder="Token"
                required
              />
            </div>
            <button type="submit">+ Add Entry</button>
          </form>
        )}
        {keys?.length > 0 && (
          <div className={styles.rows}>
            <div className={styles.captions}>
              <div>Title</div>
              <div>SpaceID</div>
              <div>CDA</div>
              <div>CPA</div>
              <div>Token</div>
            </div>
            {keys?.map(({ id, title, space, cda, cpa, token }) => (
              <div key={id} className={styles.row}>
                {title && <div>{title}</div>}
                {space && <div>{space}</div>}
                {cda && <div>{cda}</div>}
                {cpa && <div>{cpa}</div>}
                {token && <div>{token}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
