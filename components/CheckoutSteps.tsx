const CheckoutSteps = ({ current = 0 }) => {
  const steps = ['Дані користувача', 'Інормація про доставку', 'Оплата', 'Підтведження замовлення'];

  return (
      <ul className="flex flex-col gap-y-4 mx-auto md:flex-row items-center justify-start md:justify-center md:space-x-24 mt-6">
        {steps.map((step, index) => (
            <li
                key={step}
                className={`text-lg w-fit whitespace-nowrap font-medium border border-[#63823f] px-5 py-3 rounded-3xl  ${
                    index <= current ? 'text-[#31411F] bg-[#a6d96a]' : 'text-primary'
                }`}
            >
              {step}
            </li>
        ))}
      </ul>
  );
};

export default CheckoutSteps;
