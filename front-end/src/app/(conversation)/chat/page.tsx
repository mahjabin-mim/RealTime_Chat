"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import LogoutButton from '@/app/(components)/logoutButton/page';
import BackButton from '@/app/(components)/backButton/page';

interface ShowChat {
  id: number;
  message: string;
  sender: string;
  receiver: string;
}

interface DecodedToken {
  email: string;
  sub: number;
  iat: number;
  exp: number;
}

const Chat = () => {
  const [data, setData] = useState<{ message: string; receiver: string | null }>({ message: "", receiver: null });
  const [chatdata, setChatData] = useState<ShowChat[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userEmail = searchParams.get('userEmail');
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<string | null>(null);
  const [receiverName, setReceiverName] = useState('');
  
  useEffect(() => {
    if (userEmail) {
      setData((prevData) => ({ ...prevData, receiver: userEmail }));

      // const fetchUserName = async () => {
      //   try {
      //     const response = await fetch("http://localhost:8000/user/search", {
      //       method: "Get",
      //       headers: {
      //         "Content-Type": "application/json"
      //       },
      //       body: JSON.stringify({ email: userEmail })
      //     });

      //     if (response.ok) {
      //       const user = await response.json();
      //       setReceiverName(user.name);
      //     } else {
      //       //alert("not found");
      //       throw new Error('Failed to fetch user name');
      //     }
      //   } catch (error) {
      //     //alert("fetching not found")
      //     console.error('Error fetching user name:', error);
      //   }
      // };

      //fetchUserName();
    }
  }, [userEmail]);

  const handleResponse = (res: Response) => {
    if (res.status === 401) {
      Cookies.remove('authToken');
      router.push('/userLogin');
      return false;
    }
    return res.ok;
  };

  useEffect(() => {
    const token = Cookies.get('authToken');
    console.log("Token from cookies:", token); 
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken); 
        if (decodedToken.email) {
          setLoggedInUserEmail(decodedToken.email);
        } else {
          console.error('Email field not found in token');
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    const fetchData = async () => {
      try {
        const token = Cookies.get('authToken');
        const res = await fetch("http://localhost:8000/singlechat/getChat", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (handleResponse(res)) {
          const result = await res.json();
          console.log("Fetched messages:", result);
          console.log("loggedInUserEmail:", loggedInUserEmail); 
          console.log("data.receiver:", data.receiver); 
          console.log(receiverName);
          const filteredMessages = result.filter((message: ShowChat) =>
            (message.sender === loggedInUserEmail && message.receiver === data.receiver) ||
            (message.sender === data.receiver && message.receiver === loggedInUserEmail)
          );
          setChatData(filteredMessages);
        } else {
          alert("Login Expired");
          router.push('/userLogin');
        }
      } catch (error) {
        alert("Error fetching chat data");
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 1000); 
    return () => clearInterval(interval); 
  }, [loggedInUserEmail, data.receiver]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get('authToken');
    try {
      const res = await fetch("http://localhost:8000/singlechat/newMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: data.message, receiver: data.receiver }),
      });
      if (res.ok) {
        const newMessage = await res.json();
        setChatData((prev) => [...prev, newMessage]);
        //setData({ message: "" });
        setData((prevData) => ({ ...prevData, message: "", receiver: userEmail || "" }));
      } else {
        alert("Error sending message");
      }
    } catch (error) {
      alert("Error sending message");
    }
  };

  return (
    <>
    <div className='flex justify-between'>
      <div className='flex justify-start mt-10 ml-10'>
        <BackButton/>
      </div>
      <div className='flex justify-end items-center space-x-4 mt-10 mr-10'>
        <p className="text-blue-600">welcome {loggedInUserEmail}</p>
        <LogoutButton/>
      </div>
    </div>
    <p className=" ml-52 text-orange-700 font-bold mb-4">{data.receiver}</p>
    <div className="flex flex-col h-96 max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
    {/* <div className="flex flex-col flex-grow p-4 overflow-y-auto bg-gray-100"> */}
    <div className="flex flex-col flex-grow p-4 overflow-y-auto">
      <div className="flex flex-col space-y-2">
        {chatdata.length > 0 ? (
          chatdata.map((chat) => (
            <div key={chat.id} className={`flex ${chat.sender === loggedInUserEmail ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg p-2 ${chat.sender === loggedInUserEmail ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {/* <p className="text-xs text-right">{chat.sender}</p> */}
                <p className="text-sm">{chat.message}</p> 
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet</p>
        )}
      </div>
    </div>
    <div className="p-4 border-t">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          name="message"
          value={data.message}
          onChange={handleChange}
          required
          placeholder="Type here"
          className="flex-grow p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Send
        </button>
      </form>
    </div>
    </div>
    </>
  );
};

export default Chat;
