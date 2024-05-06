import { toPng } from "html-to-image";
import { useCallback, useRef, useState } from "react";
import axios from "axios";

function Certificate() {
  const ref = useRef(null);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState(null);
  const [email, setEmail] = useState("");

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.click();
        setUrl(dataUrl);
        axios
          .post(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/generate`, {
            name: name,
            email: email,
            imageURL: url,
          })
          .then(() => {
            alert("Certificate generated successfully");
          })
          .catch((err) => {
            console.log(err);
            alert("Certificate generation failed 1");
          });
      })
      .catch((err) => {
        console.log(err);
        alert("Certificate generation failed");
      });
  }, [ref]);

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const disabled =
    !name || !course || !dateRegex.test(date) || !emailRegex.test(email);

  return (
    <>
      <div className="flex flex-shrink  flex-col md:flex-row items-center justify-center w-screen h-screen overflow-x-clip">
        <div ref={ref} className=" w-[800px] h-[500px] relative">
          <img
            src="./public/TDC.png"
            alt="certificet"
            className=" w-[800px] relative h-[500px]"
          />
          <div className=" absolute text-3xl font-bold  top-40 left-[310px] text-yellow-400">
            {name}
          </div>
          <div className=" absolute top-52 flex flex-col items-center left-[245px]">
            <span>For successfully completing the {course}</span>
            <span> course on {date}.</span>
          </div>
        </div>
        <div>
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div>
            <label
              htmlFor="course_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Course name
            </label>
            <input
              type="text"
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div>
            <label
              htmlFor="course_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Date
            </label>
            <input
              type="date"
              id="course"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div>
            <label
              htmlFor="course_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="text"
              id="course"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <button
            onClick={onButtonClick}
            disabled={disabled}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-400 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 mt-10"
          >
            Generate Certificate
          </button>
        </div>
      </div>
    </>
  );
}

export default Certificate;
