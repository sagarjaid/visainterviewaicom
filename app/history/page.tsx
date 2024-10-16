'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
// import ButtonSubmitYT from '@/components/ButtonSubmitYT';
// import ChannelList from '@/components/ChannelList';
import Navbar from '@/components/Navbar';
import VisaInterviewThree from '@/components/core/visaInterviewThree';
import VisaInterviewF from '@/components/core/visaInterviewF';
import VisaInterviewTwo from '@/components/core/visaInterviewTwo';
import VisaInterview from '@/components/core/visaInterview';
import { createClient } from '@/libs/supabase/client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const supabase = createClient();

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const getResult = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: resultData, error } = await supabase
      .from('interviews')
      .select('interview_id')
      .eq('user_id', user.id);

    setHistory(resultData.map((interview) => interview.interview_id));

    console.log(resultData, 'resultData');
    setLoading(false);
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <>
      <main className='flex flex-col items-center w-full justify-center'>
        <div className='bg-green-500 text-white text-sm w-full flex justify-center items-center p-2 py-3'>
          We are working on few new features, Errors may occur
        </div>
        <div className='flex max-w-5xl w-full flex-col items-center justify-center'>
          <div className='border-b w-full'>
            <Suspense>
              <Header />
            </Suspense>
          </div>
          <div className='flex w-full max-w-5xl h-screen text-xs'>
            <Navbar />

            {/* <div className='flex justify-between w-full'> */}
            <div className='flex flex-col w-full lg:overflow-y-scroll'>
              {/* <ChannelList filter={'all'} /> */}

              {/* <VisaInterviewF baseInterviewQuestions={baseInterviewQuestions} /> */}

              {/* <VisaInterviewThree
                  baseInterviewQuestions={baseInterviewQuestions}
                /> */}

              {/* <VisaInterview
                  baseInterviewQuestions={baseInterviewQuestions}
                /> */}

              <main className='flex gap-6 flex-col p-4 w-full'>
                <div className='flex flex-col justify-start items-start text-sm  xs:text-lg sdm:text-xl sm:gap-3 md:text-2xl p-1'>
                  <div className='font-semibold'>History</div>
                  <div className='text-sm'>
                    Your Interview history will be listed here
                  </div>
                </div>

                {loading && <div>loading result history...</div>}

                {history && !loading && (
                  <div>
                    {history.map((el, i) => (
                      <a
                        href={`/history/${el}`}
                        key={i}
                        className='hover:bg-gray-50 p-4 cursor-pointer flex items-center w-full border-b'>
                        <div className='flex gap-6 items-center w-full'>
                          <svg
                            className='w-6 h-6'
                            fill='none'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
                            />
                          </svg>
                          <span>Interview ID: {el}</span>
                        </div>
                        <div>
                          <svg
                            className='w-6 h-6'
                            fill='none'
                            strokeWidth={2}
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='m8.25 4.5 7.5 7.5-7.5 7.5'
                            />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                {!history && !loading && (
                  <div className='flex items-center gap-2'>
                    <svg
                      className='w-6 h-6'
                      fill='none'
                      strokeWidth={1.5}
                      stroke='red'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
                      />
                    </svg>
                    <div className='text-red-500'>
                      No Interview History found
                    </div>
                  </div>
                )}
              </main>
            </div>

            <div className=' hidden lg:flex flex-col gap-4 w-[350px] border-l p-4 cursor-pointer'>
              <div className='flex flex-col items-start border shadow border-gray-100 w-full h-fit rounded-md'>
                <div className='flex w-full flex-col gap-1.5 p-3'>
                  <div className='flex w-full justify-between items-center'>
                    <h2 className='text-base font-semibold'>FREE Plan</h2>
                    {/* <h2 className='text-base font-semibold'>SUCCESS Plan</h2> */}

                    <a
                      href='/pricing'
                      className='border border-black text-[9px] px-2 py-0.5 rounded-full'>
                      Upgrade
                    </a>
                    {/* <span className='border border-black  bg-black text-white text-[9px] px-2 py-0.5 rounded-full'>
                      Upgrade
                    </span> */}
                  </div>
                  <div className='text-xs '>Interview credits</div>
                  <div className='text-xs'>Total : 1</div>
                  <div className='text-xs'>Remaining : 1</div>
                  <div className='text-xs'>Used : 0</div>
                </div>
                {/* <ButtonSubmitYT /> */}
              </div>

              <div className='flex flex-col bg-black text-white items-start border shadow border-gray-100 w-full h-fit rounded-md'>
                <div className='flex w-full flex-col gap-1.5 p-3'>
                  <svg
                    className='w-5 h-5'
                    fill='white'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z'
                    />
                  </svg>

                  <h2 className='text-sm font-semibold'>
                    Upgrade to Success Plan
                  </h2>

                  <div className='text-xs'>
                    Take the first step toward your dream career today!
                  </div>
                  <a
                    href='/pricing'
                    className='border w-fit bg-white text-black border-white text-[9px] mt-2 px-2 py-0.5 rounded-full'>
                    Learn More
                  </a>
                </div>
                {/* <ButtonSubmitYT /> */}
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </main>
    </>
  );
}
