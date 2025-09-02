import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="bg-background">
      {/* <AppHeader /> */}
      <section className="flex h-svh gap-8 p-2">
        {/* Form */}
        <div className="flex h-full w-full justify-center overflow-y-auto pt-12 md:w-1/2 md:items-center md:px-6 md:pt-0 lg:w-[45%]">
          <Outlet />
        </div>
        <div className="hidden max-h-full overflow-hidden rounded-3xl md:block md:w-1/2 lg:w-[55%]">
          <img
            src="/images/container.png"
            alt="Abstract blue folds hero"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
