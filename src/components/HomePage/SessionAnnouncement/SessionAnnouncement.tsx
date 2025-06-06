import Container from '../../Shared/Container/Container';
import { IMAGES } from '../../../assets';
import Heading1 from '../../Reusable/Heading1/Heading1';
import Paragraph from '../../Reusable/Paragraph/Parahraph';
import Ripple from '../../Reusable/Ripple/Ripple';
import { Link } from 'react-router-dom';

const SessionAnnouncement = () => {
    return (
        <div className='bg-white py-[96px] font-Inter'>
            <Container>
                <div className='flex flex-col xl:flex-row gap-8 xl:gap-0 items-center justify-between'>
                    <img src={IMAGES.leadershipProgram} alt="session-announcement" className='w-full max-w-[600px]' />
                    <div>
                        <div className='flex flex-col gap-4'>
                            <div className='rounded-3xl bg-neutral-15 px-4 py-[6px] text-primary-10 font-medium leading-6 text-center w-fit'>Stay tuned! Date coming soon!</div>
                            <Heading1 classNames='max-w-[599px]'>
                                Leadership Development Training Sessions
                            </Heading1>
                            <Paragraph classNames='max-w-[467px]'>
                                Any leader progresses only when he stays connected with regular trainings and is ready to learn new things every day. These training sessions of PMGURUKKUL will help you a lot in becoming a successful and accomplished leader. Register yourself for free today to attend these regular training sessions.
                            </Paragraph>
                        </div>

                        <Link to={"/contact-us"}>
                            <Ripple styles="rounded-xl w-fit mt-7">
                                <button className="bg-primary-gradient px-5 py-[10px] text-primary-10 text-xl font-semibold leading-7 rounded-[10px] w-fit">
                                    Free Register Now
                                </button>
                            </Ripple>
                        </Link>
                    </div>
                </div>
            </Container>

        </div>
    );
};

export default SessionAnnouncement;