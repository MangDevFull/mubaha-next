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
        <script src="/assets/js/jquery-3.3.1.min.js"></script>

<script src="/assets/js/menu.js"></script>
<script src="/assets/js/sticky-menu.js"></script>

<script src="/assets/js/lazysizes.min.js"></script>

<script src="/assets/js/bootstrap.bundle.min.js"></script>

<script src="/assets/js/feather.min.js "></script>

<script src="/assets/js/bootstrap-notify.min.js"></script>
<script src="/assets/js/slick.js"></script>
<script src="/assets/js/script.js"></script>
<script src="/assets/js/jquery-3.3.1.min.js"></script>

<script src="/assets/js/bootstrap.bundle.min.js"></script>

<script src="/assets/js/icons/feather-icon/feather.min.js"></script>
<script src="/assets/js/icons/feather-icon/feather-icon.js"></script>

<script src="/assets/js/sidebar-menu.js"></script>


<script src="/assets/js/chart/chartist/chartist.js"></script>


<script src="/assets/js/chart/chartjs/chart.min.js"></script>

<script src="/assets/js/lazysizes.min.js"></script>

<script src="/assets/js/prism/prism.min.js"></script>
<script src="/assets/js/clipboard/clipboard.min.js"></script>
<script src="/assets/js/custom-card/custom-card.js"></script>

<script src="/assets/js/counter/jquery.waypoints.min.js"></script>
<script src="/assets/js/counter/jquery.counterup.min.js"></script>
<script src="/assets/js/counter/counter-custom.js"></script>

<script src="/assets/js/chart/peity-chart/peity.jquery.js"></script>

<script src="/assets/js/chart/sparkline/sparkline.js"></script>

<script src="/assets/js/admin-customizer.js"></script>

<script src="/assets/js/dashboard/default.js"></script>

<script src="/assets/js/chat-menu.js"></script>

<script src="/assets/js/height-equal.js"></script>

<script src="/assets/js/lazysizes.min.js"></script>

<script src="/assets/js/admin-script.js"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;900&display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href="/mubaha/mubaha-light_64x64.ico" />
          <link href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet"/>
          <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

          <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet"/>
          <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
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
