import React, { useState, useEffect } from "react";
import { Layout, Form, Select, Input, Button } from "antd";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import api from "../api"

const SubString = () => {
  const [form] = Form.useForm();
  const [words, setWords] = useState([
    "MAN",
    "WOMAN",
    "HELLO",
    "INFORMATION",
    "LAPTOP",
  ]);
  const [chars, setChar] = useState(["M", "A", "N"]);
  const [subString, setSubString] = useState("");


  useEffect (()=>{
    getWords()
  })

  const getWords =()=>{
    api.get('/').then((res)=>{
      console.log("res>>>>>>>>>>>>", res.data)
      setWords(res.data.words)
    }).catch((err)=>{
      console.log("res>>>>>>>>>>>>", err)
    })
  }

  const saveWord = (word) =>{
    api.post('/saveword', {"word":word})
    .then((res)=>{
      console.log("res>>>>>>>>>>>>", res.data)
    }).catch((err)=>{
      console.log("res>>>>>>>>>>>>", err)
    })
  }




  const onCharClick = (value) => {
    const chars = subString + value.target.id;
    setSubString(chars);
  };

  let wordChars = chars.map((char) => (
    <Button onClick={(e) => onCharClick(e)} value={char}>
      {char}
    </Button>
  ));

  const renderCharacters = (word) => {
    const splittedWord = word.split("");
    setChar(splittedWord);
    console.log(word.split(""));
  };

  const addWords = () => {
    const word = form.getFieldValue("word");
    setWords((prevItems) => [...prevItems, word]);

    saveWord(word)
    form.resetFields();
  };

  let wordOptions = words.map((word) => (
    <Select.Option value={word}>{word}</Select.Option>
  ));

  const renderWordsSelection = (
    <div>
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="horizontal"
        name="word-selection"
      >
        <div className="substring-wrapper">
          <Form.Item
            name="word"
            label="Enter Word"
            className="word-selection-form"
          >
            <div className="words-input">
              <Input />
              <Button type="primary" htmlType="submit" onClick={addWords}>
                Add
              </Button>
            </div>
          </Form.Item>
          <Form.Item
            name="words"
            label="Select Word"
            className="word-selection-form"
            rules={[
              {
                required: true,
                message: "Please select county",
              },
            ]}
          >
            <Select onSelect={renderCharacters}> {wordOptions} </Select>
          </Form.Item>
        </div>
      </Form>
    </div>
  );

  return (
    <div>
      <NavBar />
      <Layout>
        <SideBar menu={renderWordsSelection} />
        <Layout.Content className="content">
          <div className="sub-string-content">
            {wordChars}
            {subString}
          </div>
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default SubString;
