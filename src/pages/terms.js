
import Navbar from "@/Components/Navbar";
import Head from "next/head";
import React from 'react';
export async function getStaticProps(){
  const data = {}
    return {
      props :{
          data 
      },
    }
}
function TermsAndConditions() {
  return (
    <>
    <Head>
    <title> terms & Conditions</title>
    <link rel="canonical" href= {`https://${process.env.HOST}/terms`} />
    </Head>
    <Navbar className="z-30 "/>
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>

      <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing and using the website GameIsTech.com (hereinafter referred to as the Website) or any services provided on the Website, you agree to comply with and be bound by these Terms and Conditions. 
        If you do not agree to these Terms and Conditions, please do not use the Website.
      </p>

      <h2 className="text-xl font-semibold">2. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to modify or amend these Terms and Conditions at any time. Any changes will be effective immediately upon posting on the Website. 
        It is your responsibility to review these Terms and Conditions regularly,
         and your continued use of the Website after any modifications constitutes your acceptance of the revised Terms and Conditions.
      </p>

      <h2 className="text-xl font-semibold">3. Privacy Policy</h2>
      <p className="mb-4">
        Your use of the Website is also governed by our Privacy Policy, which can be found at [Link to Privacy Policy]. By using the Website, you consent to the practices outlined in the Privacy Policy.
      </p>

      <h2 className="text-xl font-semibold">4. User Responsibilities</h2>
      <ul className="list-disc ml-8 mb-4">
        <li>You agree to use the Website for lawful purposes only.</li>
        <li>You will not engage in any activities that could harm, disrupt, or interfere with the proper functioning of the Website.</li>
        <li>You are responsible for maintaining the confidentiality of your account information, including your username and password.</li>
      </ul>

      <h2 className="text-xl font-semibold">6. Disclaimer</h2>
      <p className="mb-4">
        The information provided on the Website is for general informational purposes only. We make no representations or warranties regarding the accuracy, completeness, or suitability of the information for any particular purpose. 
        Your use of any information obtained from the Website is at your own risk.
      </p>

      <h2 className="text-xl font-semibold">7. Limitation of Liability</h2>
      <p className="mb-4">
        In no event shall GameIsTech.com be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with your use of the Website or the content on the Website.
      </p>

      <h2 className="text-xl font-semibold">8. Termination</h2>
      <p className="mb-4">
        We reserve the right to terminate or suspend your access to the Website at our sole discretion, without notice and for any reason, including but not limited to a breach of these Terms and Conditions.
      </p>

      <h2 className="text-xl font-semibold">9. Governing Law</h2>
      <p className="mb-4">
        These Terms and Conditions are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any legal actions arising out of or related to these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts located in [Your Jurisdiction].
      </p>

      <h2 className="text-xl font-semibold">10. Contact Information</h2>
      <p>
        If you have any questions or concerns about these Terms and Conditions, you can contact us at [Contact Email Address].
      </p>
    </div>
    </>
  );
}

export default TermsAndConditions;

