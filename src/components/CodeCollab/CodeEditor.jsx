/* eslint-disable react/prop-types */
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";

const CodeEditor = ({ code, handleCodeChange }) => {
  return (
    <CodeMirror
      value={code}
      height="500px"
      theme={oneDark}
      extensions={[javascript()]}
      onChange={(value) => handleCodeChange(value)}
      className="border border-gray-300 rounded-lg"
    />
  );
};

export default CodeEditor;
