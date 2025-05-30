import Container from "../../Shared/Container/Container";
import { content1, content2, content3, content4 } from "./content";

const TermsAndConditionsContent = () => {
  return (
    <Container>
      <div className="font-Inter py-[64px] max-w-full xl:max-w-[1080px] mx-auto">
        <p className="text-black text-lg leading-6">
          THESE TERMS AND CONDITIONS IS A LEGAL AND BINDING AGREEMENT MADE
          SOLELY BETWEEN YOU ( “User/You/YOUR” ) AND{" "}
          <strong>PMGURUKKUL EDTECH MARKETING LLP</strong> ( “COMPANY/WE/US/OUR”
          ) .
        </p>
        <p className="text-black text-lg leading-6 mt-4">
          These Terms & Conditions (<strong>“Terms”</strong>) includes use of
          our website{" "}
          <a href="www.pmgurukkul.com" target="_blank">
            <strong>www.pmgurukkul.com</strong>
          </a>{" "}
          (<strong>Website</strong>), our applications (“ Application ”) or any
          products or services in connection with the
          Application/Website/Products (<strong>Services</strong>) .
        </p>
        <p className="text-black text-lg leading-6 mt-4">
          These Terms constitute an electronic record in accordance with the
          provisions of the Information Technology Act, 2000 and the Information
          Technology (Intermediaries guidelines) Rules, 2011 thereunder, as
          amended from time to time.
        </p>
        <p className="text-black text-lg leading-6 mt-4">
          Please read the Terms and the privacy policy of the Company (
          <strong>“Privacy Policy”</strong>) with respect to registration with
          us, the use of the Application, Website, Services and products
          carefully before using the Application, Website, Services or products.
          In the event of any discrepancy between the Terms and any other
          policies with respect to the Application or Website or Services or
          products, the provisions of the Terms shall prevail.
        </p>

        {/* Content 1 */}
        <div>
          {content1.map((content, index) => (
            <p key={index} className="text-black text-lg leading-6 mt-4">
              {content}
            </p>
          ))}
        </div>
        {/* Content 2 */}
        <div className="flex flex-col gap-4 mt-4">
          {content2.map((content, index) => (
            <div key={index}>
              <h1 className="text-primary-10 text-2xl font-bold">
                {content?.heading}
              </h1>
              {content?.details?.map((detail) => (
                <p key={detail} className="text-black text-lg leading-6 mt-4">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Content 3 */}
        <div className="flex flex-col gap-4 mt-4">
          {content3.map((content, index) => (
            <div key={index}>
              <h1 className="text-primary-10 text-2xl font-bold">
                {content?.heading ? content?.heading : ""}
              </h1>
              {content?.details?.map((detail) => (
                <p key={detail} className="text-black text-lg leading-6 mt-4">
                  {detail}
                </p>
              ))}
              {content?.poniters
                ? content?.poniters?.map((pointer) => (
                    <p
                      key={pointer}
                      className="text-black text-lg leading-6 mt-4"
                    >
                      {pointer}
                    </p>
                  ))
                : ""}
            </div>
          ))}
        </div>

        <h1 className="text-primary-10 text-2xl font-bold mt-4">
          Copyright Policy
        </h1>
        <p className="text-black text-lg leading-6 mt-4">
          We respect the intellectual property rights of others. It is our
          policy to respond to any claim that content posted on the Service
          infringes on copyright or other intellectual property rights.
          Copyright owners or authorized representatives may submit claims of
          infringement via email to{" "}
          <a href="support@pmgurukkul.com" target="_blank">
            <strong className="text-blue-10 hover:underline">
              support@pmgurukkul.com
            </strong>
          </a>{" "}
          . Misrepresentation or bad-faith claims of infringement may result in
          accountability for damages, including costs and attorneys' fees.
        </p>

        {/* Content 4 */}
        <div className="flex flex-col gap-4 mt-4">
          {content4.map((content, index) => (
            <div key={index}>
              <h1 className="text-primary-10 text-2xl font-bold">
                {content?.heading}
              </h1>
              {content?.details?.map((detail) => (
                <p
                  key={index}
                  className="text-black text-lg leading-6 mt-4"
                  dangerouslySetInnerHTML={{ __html: detail }}
                ></p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default TermsAndConditionsContent;
