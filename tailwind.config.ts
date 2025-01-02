/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter', 'serif'],
      },

      colors : {
        white : "#FFF",

        primary : {
          10 : "#051539",
          15 : "#263238"
        }, 
        
        secondary : {
          10 : "#FFD614",
          15 : "#EFD881",
          20 : '#F4E28C',
        },

        neutral : {
          10 : "#8A9BB1",
          15 : "#CBD5E1",
          20 : "#FAFAFA"
        }
      },

      backgroundImage : {
       "primary-gradient" : "linear-gradient(180deg, #EFD881 0%, #FFB200 100%)",
       "primary-gradient-light" : "linear-gradient(180deg, #EFD881 0%, #C59629 100%)",
       
       'gradient-dark-blue' : 'linear-gradient(90deg, #122755 0%, #051539 100%)',
       'gradient-light-rose' : 'linear-gradient(0deg, rgba(255, 162, 57, 0.10) 0%, rgba(255, 162, 57, 0.10) 100%), #FFF'
      },

      boxShadow : {
        "primary-shadow" : "0px 16px 28px -5px rgba(239, 216, 129, 0.15)",
        "shadow-light-gray" : "0px 20px 250px -20px rgba(151, 71, 255, 0.15)",
      }
    },
  },
  plugins: [],
}

