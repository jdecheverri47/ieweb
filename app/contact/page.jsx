'use client'

import Image from 'next/image'
import vCardFactory from "vcards-js";
import { PhoneIcon } from '@heroicons/react/24/outline'
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { InboxIcon } from '@heroicons/react/24/outline'
import { CircularProgress } from '@mui/joy';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

function ContactPage() {
  const [data, setData] = useState(null);
  const searchParams = useSearchParams();
  const search = searchParams.get('user');

  useEffect(() => {
    const docRef = doc(db, "users", search);
    const getDocAsync = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      }
      console.log("Document data:", docSnap.data());
    };

    getDocAsync();
  }, [search]);

  function cleanVCardString(vCardString) {
    let vCardCleaner = vCardString.replace(/;CHARSET=UTF-8/g, '');
    vCardCleaner = vCardCleaner.replace(/X-SOCIALPROFILE/g, 'URL');
    console.log(vCardCleaner);
    return vCardCleaner;
  }

  const downloadTxtFile = vcfText => {
    console.log(vcfText)
    const element = document.createElement("a");
    const file = new Blob([vcfText], { type: "text/vcard;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "contact.vcf";
    document.body.appendChild(element);
    element.click();
  };


  const downloadContact = () => {
    const vcard = vCardFactory();

    vcard.firstName = data?.name;
    vcard.email = data?.email;
    vcard.organization = "Internacional de electricos";
    vcard.photo.attachFromUrl(
      "https://avatars.githubusercontent.com/u/56592200?v=4"
    );
    vcard.workPhone = data?.phone;
    vcard.socialUrls["linkedin"] = "https://www.linkedin.com/company/ie-grupo/";
    vcard.socialUrls["twitter"] = "https://twitter.com/ie_grupo";
    vcard.socialUrls["facebook"] = "https://www.facebook.com/ie.grupo";
    vcard.socialUrls["instagram"] = "https://www.instagram.com/iegrupo/";
    vcard.socialUrls["website"] = "https://www.iegrupo.co/";

    // console.log(vcard.getFormattedString());
    let vCardString = vcard.getFormattedString();
    vCardString = cleanVCardString(vCardString);
    console.log(vCardString);
    return vCardString;
  };

  if (!data) return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <CircularProgress variant='plain' color='warning' />
    </div>
  )

  return (
    <section className='w-screen h-[90vh] flex flex-col justify-center items-center'>
      <div className='w-fit flex flex-col justify-center items-center my-auto'>
        <div className='flex flex-row gap-4'>
          <div>
            <Image width={65} height={65} alt='ie-logo' src="/images/logo-ie-header.png"/>
          </div>
          <div>
            <Image width={180} height={120} alt='ie-logo' src="/images/Mi_tarjeta_digital.png"/>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center mt-[5vh]'>
          <Image alt='profile picture' width={180} height={180} src='/images/blank-image.png' className='rounded-full shadow-sm border-2 border-[#FFE100]' priority/>
          <div className='flex flex-col pt-5 justify-center items-center max-w-[60vw]'>
            <h1 className='font-semibold text-2xl w-[300px] text-center'>
              {data?.name}
            </h1>
            <h2 className='text-xl font-thin text-[#7b7b7b] text-center'>
              {data?.department}
            </h2>
          </div>
        </div>
        <div className='flex flex-col justify-start items-start w-full mt-7 gap-2'>
          <div className='flex gap-4'>
            <InboxIcon className='w-6 h-6 text-[#FFE100]' />
            <h3>
              {data?.email}
            </h3>
          </div>

          <div className='flex gap-4'>
            <DevicePhoneMobileIcon className='w-6 h-6 text-[#FFE100]' />
            <h3>
              {data?.phone}
            </h3>
          </div>

          <div className='flex gap-4'>
            <PhoneIcon className='w-6 h-6 text-[#FFE100]' />
            <h3>
              (601) 744 81 30
            </h3>
          </div>

          <div className='flex gap-4'>
            <MapPinIcon className='w-6 h-6 text-[#FFE100]' />
            <h3>
              Bogotá Calle 22B N° 30-32  Puerta 2
            </h3>
          </div>
        </div>

        <div>
          <button
            className='bg-[#FFE100] text-black font-medium py-[0.5rem] px-[5.2rem] my-5 rounded-lg mt-8 flex justify-center items-center'
            onClick={() => downloadTxtFile(downloadContact())}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 0 640 512" className='pr-2'><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
            Add Contact
          </button>
        </div>
      </div>

      <div>
        <p>Powered by <strong className='text-yellow-300'>Internacional de Electricos.</strong></p>
      </div>
    </section>
  )
}

export default ContactPage;

