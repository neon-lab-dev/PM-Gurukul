import { Helmet } from "react-helmet-async";
import DisclaimerHero from "../../components/DisclaimerPage/DisclaimerHero/DisclaimerHero";

const Disclaimer = () => {
    const content = [
        "The information contained in this website is for general information purposes only. The information is provided by PMGURUKKUL EDTECH MARKETING LLP and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.",
        'In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arise out of, or in connection with, the use of this website. The Site cannot and does not contain financial advice. The information is provided for general informational and educational purposes and is not a substitute for professional financial advice.',
        'Through this website you are able to link to other websites which are not under the control of PMGURUKKUL EDTECH MARKETING LLP. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them. The amount that a customer pay is only for the online courses provided in the product purchased by the customer. No amount is paid by the customer to become an affiliate. The option to become an affiliate is free of cost and optional with the purchase of any product through the affiliate link of the person who referred them to the PMGURUKKUL website. Our aim is only to provide education and not to encourage people to earn money. We do not guarantee any commission or financial returns. PMGURUKKUL does not authorize any person or affiliate to collect payment against our products in cash or in their personal bank or in their Paytm account. And, also not responsible for any payment made against our products to anyone in any mode other than our website or through an affiliate link which takes you through our website. Every effort is made to keep the website up and running smoothly. However, PMGURUKKUL EDTECH MARKETING LLP takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.'
    ];
    return (
        <div>
            <Helmet>
                <title>PMGURUKKUL | Disclaimer</title>
            </Helmet>
            <DisclaimerHero />
            <div className="font-Inter py-[64px] max-w-full xl:max-w-[1080px] mx-auto">
                {
                    content?.map((content) =>
                        <p key={content} className="text-black text-lg leading-6 mt-4">{content}</p>
                    )
                }
            </div>
        </div>
    );
};

export default Disclaimer;