import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { Input, Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Head, ContentWrapper, DivPopup } from './styles';

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function loadQuestions() {
      const response = await api.get('/help-orders');
      setQuestions(response.data);
    }
    loadQuestions();
  }, []);

  async function handleAnswerQuestion({ id, answer }) {
    try {
      await api.post(`help-orders/${id}/answer`, {
        answer
      });
      toast.success('Answer sent!');
    } catch (err) {
      console.tron.log(err);
      toast.error('Something went wrong!');
    }
  }

  return (
    <Container>
      <Head>
        <h1>Questions</h1>
      </Head>

      <ContentWrapper>
        <ul>
          <li>
            <strong>MEMBER NAME</strong>
          </li>
        </ul>
        <div>
          {questions.map(question => (
            <li name="id" key={question.id}>
              <span>{question.member.name}</span>
              <div>
                <Popup
                  trigger={
                    <button className="defaultBtn answer" type="button">
                      answer
                    </button>
                  }
                  position="center"
                  modal
                  closeOnDocumentClick
                >
                  <Form /* schema={} */ onSubmit={handleAnswerQuestion}>
                    <DivPopup>
                      <h3>MEMBERS QUESTION</h3>
                      <div>
                        <span>{question.question}</span>
                      </div>
                      <h3>ANSWER</h3>

                      <Input
                        name="answer"
                        type="text"
                        multiline
                        placeholder="Type your message here"
                      />
                      <Input type="hidden" name="id" value={question.id} />
                      <button className="defaultBtn" type="submit">
                        Send answer
                      </button>
                    </DivPopup>
                  </Form>
                </Popup>
              </div>
            </li>
          ))}
        </div>
      </ContentWrapper>
    </Container>
  );
}
