import {
  FaPlus,
  FaSave,
  FaTrash,
  FaFileImport,
  FaFileExport,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import Head from "next/head";
import { initialKey, STRINGS } from "../utils";
import styles from "../styles/Home.module.css";

export default function Home() {
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
    const hasData = localStorage?.getItem(STRINGS.AUTH_TOKEN);
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
      alert(STRINGS.INVALID_ENTRY);
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
    localStorage?.setItem(STRINGS.AUTH_TOKEN, JSON.stringify(saveThis));
  };
  const handleClear = () => {
    localStorage?.removeItem(STRINGS.AUTH_TOKEN);
    setConfig(initialConfig);
  };
  const handleExport = () => {
    alert(JSON.stringify(config));
  };
  const handleImport = () => {
    const data = prompt(STRINGS.INVALID_EXPORT);
    if (!data) return;
    setConfig(JSON.parse(data));
    handleSave(JSON.parse(data));
  };
  return (
    <div className={styles.app}>
      <Head>
        <title>{STRINGS.SITE_TITLE}</title>
        <meta name="description" content={STRINGS.SITE_INFO} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.grid}>
        <header>{STRINGS.SITE_INFO}</header>
        <div className={styles.buttons}>
          <button
            className={styles.iconButton}
            onClick={handleAddSite}
            title={STRINGS.ADD_LABEL}
            aria-label={STRINGS.ADD_LABEL}
          >
            <FaPlus />
          </button>
          <button
            className={styles.iconButton}
            onClick={() => handleSave()}
            title={STRINGS.SAVE_LABEL}
            aria-label={STRINGS.SAVE_LABEL}
          >
            <FaSave />
          </button>
          <button
            className={styles.iconButton}
            onClick={handleClear}
            title={STRINGS.CLEAR_LABEL}
            aria-label={STRINGS.CLEAR_LABEL}
          >
            <FaTrash />
          </button>
          <button
            className={styles.iconButton}
            onClick={handleImport}
            title={STRINGS.IMPORT_LABEL}
            aria-label={STRINGS.IMPORT_LABEL}
          >
            <FaFileImport />
          </button>
          <button
            className={styles.iconButton}
            onClick={handleExport}
            title={STRINGS.EXPORT_LABEL}
            aria-label={STRINGS.EXPORT_LABEL}
          >
            <FaFileExport />
          </button>
        </div>
        {addEntry && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
              <label htmlFor={STRINGS.TITLE.toLowerCase()}>
                {STRINGS.TITLE}
              </label>
              <input
                id={STRINGS.TITLE.toLowerCase()}
                name={STRINGS.TITLE.toLowerCase()}
                onChange={handleChange}
                value={title}
                placeholder={STRINGS.TITLE}
                required
              />
            </div>
            <div className={styles.group}>
              <label htmlFor={STRINGS.SPACE.toLowerCase()}>
                {STRINGS.SPACE_ID}
              </label>
              <input
                id={STRINGS.SPACE.toLowerCase()}
                name={STRINGS.SPACE.toLowerCase()}
                onChange={handleChange}
                value={space}
                placeholder={STRINGS.SPACE_ID}
                required
              />
            </div>
            <div className={styles.group}>
              <label htmlFor={STRINGS.CDA.toLowerCase()}>{STRINGS.CDA}</label>
              <input
                id={STRINGS.CDA.toLowerCase()}
                name={STRINGS.CDA.toLowerCase()}
                onChange={handleChange}
                value={cda}
                placeholder={STRINGS.CDA}
                required
              />
            </div>
            <div className={styles.group}>
              <label htmlFor={STRINGS.CPA.toLowerCase()}>{STRINGS.CPA}</label>
              <input
                id={STRINGS.CPA.toLowerCase()}
                name={STRINGS.CPA.toLowerCase()}
                onChange={handleChange}
                value={cpa}
                placeholder={STRINGS.CPA}
                required
              />
            </div>
            <div className={styles.group}>
              <label htmlFor={STRINGS.TOKEN.toLowerCase()}>
                {STRINGS.ACCESS_TOKEN}
              </label>
              <input
                id={STRINGS.TOKEN.toLowerCase()}
                name={STRINGS.TOKEN.toLowerCase()}
                onChange={handleChange}
                value={token}
                placeholder={STRINGS.TOKEN}
                required
              />
            </div>
            <button type="submit">{STRINGS.ADD_ENTRY}</button>
          </form>
        )}
        {keys?.length > 0 && (
          <div className={styles.rows}>
            <div className={styles.captions}>
              <div>{STRINGS.TITLE}</div>
              <div>{STRINGS.SPACE_ID}</div>
              <div>{STRINGS.CDA}</div>
              <div>{STRINGS.CPA}</div>
              <div>{STRINGS.TOKEN}</div>
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
