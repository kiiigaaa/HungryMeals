import React from 'react'
import ChatBot from 'react-simple-chatbot';

export default function chatbot() {
  return (
    <div>

      <ChatBot
        botAvatar="https://static.wixstatic.com/media/618c8c_b185b378c6c24542b51061fcc4e9874f~mv2.png"
        userAvatar= "https://static.wixstatic.com/media/618c8c_5f176f88792f40609c74309e7f6f2eb2~mv2.png"
        enableMobileAutoFocus 
       
        headerTitle="Chat with us"
        steps={[
          {
            id: '1',
            message: 'What is your name?',
            trigger: '2',
          },
          {
            id: '2',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}, nice to meet you! I Agent in HungryMeals',
            trigger: '5',
          },
          {
            id: '5',
            message: 'What brings you here ?',
            trigger: '6',
          },
          {
            id: '6',
            options: [
              { value: 1, label: 'Order Inquiries!', trigger: '7' },
              { value: 2, label: 'Give Feedback!', trigger: '8' },
              { value: 3, label: 'Track your orders!', trigger: '9' },
            ],
          },
          {
            id: '7',
            message: 'Not Completed!',
            end: true,
          },
          {
            id: '8',
            component: (
               <a href='/feedback'>Click here!</a>
            ),
            end: true,
          },
          {
            id: '9',
            message: 'Not Colmpleted',
            end: true,
          },


        ]}
      />




    </div>
  )
}
