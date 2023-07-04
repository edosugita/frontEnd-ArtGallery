import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
                {/*<link rel="stylesheet" href="/admin/css/app.min.css" />*/}
            </Head>
            <body>
                <Main />
                <NextScript />
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/spin.js/2.3.2/spin.min.js" strategy="beforeInteractive" />
                {/*<script src="/admin/js/vendors.min.js"></script>*/}

                {/*<script src="/admin/vendors/chartjs/Chart.min.js"></script>*/}
                {/*<script src="/admin/vendors/datatables/jquery.dataTables.min.js"></script>*/}
                {/*<script src="/admin/vendors/datatables/dataTables.bootstrap.min.js"></script>*/}
                {/*<script src="/admin/vendors/select2/select2.min.js"></script>*/}
                {/*<script src="/admin/vendors/bootstrap-datepicker/bootstrap-datepicker.min.js"></script>*/}
                {/*<script src="/admin/vendors/quill/quill.min.js"></script>*/}

                {/*<script src="/admin/js/app.min.js"></script>*/}
            </body>
        </Html>
    )
}
