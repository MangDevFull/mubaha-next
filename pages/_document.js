import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;900&display=swap" rel="stylesheet" />
          {/* <link
            href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900"
            rel="stylesheet"
          />

          <link href="/assets/webfonts/ember.css" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />

          <link
            rel="stylesheet"
            type="text/css"
            href="/assets/css/vendors/fontawesome.css"
          />

          <link
            rel="stylesheet"
            type="text/css"
            href="/assets/css/vendors/slick.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/assets/css/vendors/slick-theme.css"
          />

          <link
            rel="stylesheet"
            type="text/css"
            href="/assets/css/vendors/animate.css"
          />

          <link
            rel="stylesheet"
            type="text/css"
            href="/assets/css/vendors/themify-icons.css"
          />

          <link
            rel="stylesheet"
            type="text/css"
            href="/assets/css/vendors/bootstrap.css"
          />

          <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
          <link rel="stylesheet" type="text/css" href="/mubaha/css/style.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="/assets/css/mubaha.css"
          ></link> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
