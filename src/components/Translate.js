import React, { useState, useEffect } from "react";
import { Form, TextArea, Button, Icon } from "semantic-ui-react";
import axios from "axios";

function Header() {
	return (
		<div className="app-header">
			<h2 className="header">Text Translator</h2>
		</div>
	);
}

function Body() {
	// store user inputted text
	const [inputText, setInputText] = useState("");

	// store translated text
	const [resultText, setResultText] = useState("");

	// store the language to translate to
	const [selectedLanguageKey, setSelectedLanguageKey] = useState("");

	// store the option of languages
	const [languagesList, setLanguagesList] = useState([]);

	// store the auto detected language user is using
	const [detectLanguageKey, setDetectedLanguageKey] = useState("");

	// detect the language of input
	const getLanguageSource = () => {
		axios
			.post(`https://libretranslate.de/detect`, {
				q: inputText,
			})
			.then((response) => {
				setDetectedLanguageKey(response.data[0].language);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	// translate the text to other language
	const translateText = () => {
		setResultText(inputText);

		getLanguageSource();

		let data = {
			q: inputText,
			source: detectLanguageKey,
			target: selectedLanguageKey,
		};
		axios.post(`https://libretranslate.de/translate`, data).then((response) => {
			setResultText(response.data.translatedText);
		});
	};

	// get the language selected
	const languageKey = (selectedLanguage) => {
		setSelectedLanguageKey(selectedLanguage.target.value);
	};

	// useEffect hook
	useEffect(() => {
		axios.get(`https://libretranslate.de/languages`).then((response) => {
			setLanguagesList(response.data);
		});

		getLanguageSource();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputText]);

	return (
		<div className="app-body">
			<div>
				<Form>
					<Form.Field
						className="text"
						control={TextArea}
						placeholder="Type Text to Translate."
						onChange={(e) => setInputText(e.target.value)}
					/>

					<select className="language-select" onChange={languageKey}>
						<option>Select A Language</option>
						{languagesList.map((language, key) => {
							return (
								<option key={key} value={language.code}>
									{language.name}
								</option>
							);
						})}
					</select>

					<Form.Field
						className="text"
						control={TextArea}
						placeholder="Result Translation.."
						value={resultText}
					/>

					<Button color="blue" size="large" onClick={translateText}>
						<Icon name="translate" />
						Translate
					</Button>
				</Form>
			</div>
		</div>
	);
}

function Translate() {
	return (
		<div>
			<Header />
			<Body />
		</div>
	);
}

export default Translate;
