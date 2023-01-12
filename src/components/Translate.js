import React, { useState } from "react";
import { Form, TextArea, Button, Icon } from "semantic-ui-react";
import { setCORS} from "google-translate-api-browser";
import languageList from "./language_list.json";

function Header() {
	return (
		<div className="app-header">
			<h2 className="header">Text Translator</h2>
		</div>
	);
}

function Body() {
	// setting up cors-anywhere server address
	const translate = setCORS("http://cors-anywhere.herokuapp.com/");

	// store user inputted text
	const [inputText, setInputText] = useState("");

	// store translated text
	const [resultText, setResultText] = useState("");

	// store the language to translate to
	const [selectedLanguageKey, setSelectedLanguageKey] = useState("");

	// translate the text to other language
	const translateText = () => {
		setResultText(inputText);

		translate(inputText, { to: selectedLanguageKey })
			.then((res) => {
				setResultText(res.text);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// get the language selected
	const languageKey = (selectedLanguage) => {
		setSelectedLanguageKey(selectedLanguage.target.value);
	};

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
						{languageList.text.map((language, key) => {
							return (
								<option key={key} value={language.code}>
									{language.language}
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
