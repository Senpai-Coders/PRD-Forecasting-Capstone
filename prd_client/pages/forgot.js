import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Validator } from "../helpers";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Head from "next/head";

const Forgot = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = (e) => {
    setLoading(true);
    const response = fetch("/api/auth", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authMode: -2,
        recoverData: {
          email,
        },
      }),
    })
      .then((res) => {
        if (res.status === 404) {
          toast.warning("This email is not registered", {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw Error("User not found");
        }
        return res;
      })
      .then((data) => {
        setIsSent(true);
        toast.success("Your temporary password was sent via your email", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        setErr(err.message);
      })
      .finally((d) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    let { email } = router.query;
    if (email) {
      setEmail(email);
    }
  }, [router]);

  return (
    <div className="bg-rice-pattern h-screen w-full flex justify-center items-center">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={1}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Head>
        <title>Forgot</title>
        <meta
          name="description"
          content="Philip Rice Dealer Online store & forecasting"
        />
        <link itemProp="image" href="cover.png" />
        <meta itemProp="name" content="Philip Rice Dealer" />
        <meta
          itemProp="description"
          content="Philip Rice Dealer Online store & forecasting"
        />
        <meta
          itemProp="image"
          content="cover.png"
        />

        <meta
          property="og:url"
          content="https://prd-forecasting-capstone.vercel.app"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Philip Rice Dealer" />
        <meta
          property="og:description"
          content="Philip Rice Dealer Online store & forecasting"
        />
        <meta
          property="og:image"
          content="cover.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Philip Rice Dealer" />
        <meta
          name="twitter:description"
          content="Philip Rice Dealer Online store & forecasting"
        />
        <meta
          name="twitter:image"
          content="cover.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center card glass p-8 shadow-md">
        <img
          className="w-4/12 m-auto"
          src="https://cdn.discordapp.com/attachments/955281529481883729/1036886425045577758/prd.png"
        ></img>

        <p className="text-sm animate-pulse text-center mt-8 font-inter text-error">
          {err}
        </p>

        <form>
          {isSent ? (
            <p className="font-inter text-sm break-all">
              We&apos;ve sen&apos;t your temporary password to your email
            </p>
          ) : (
            <div className="mt-8 form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-inter font-medium ">
                  Email
                </span>
              </label>
              <input
                type="text"
                tabIndex={1}
                required
                onChange={(e) => {
                  setErr("");
                  var val = e.target.value;
                  setEmail(val);
                }}
                value={email}
                className={`input input-sm bg-base-200/50 w-full hover:bg-base-100 max-w-xs focus:ring-4 hover:ring-4 ${
                  !err.includes("not found") &&
                  Validator(email, ["isEmpty", "isEmail"])
                    ? "ring-fuchsia-100"
                    : "ring-rose-300"
                }`}
              />
            </div>
          )}

          <div className="w-full flex justify-center">
            <button
              tabIndex={3}
              disabled={!Validator(email, ["isEmail"]) || loading}
              onClick={(e) => {
                e.preventDefault();
                if (isSent) router.push("/login");
                else login(e);
              }}
              className={
                "btn mt-8 btn-sm btn-primary btn-wide" +
                `${loading ? "loading" : ""}`
              }
            >
              {loading
                ? "sending"
                : isSent
                ? "Go to login"
                : "Send Temporary Password"}
            </button>
          </div>
        </form>
        {!isSent && (
          <p className="mt-5 text-sm">
            Remembered your password?{" "}
            <a
              tabIndex={4}
              className="text-primary cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login Now
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Forgot;
