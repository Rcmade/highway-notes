import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="relative bg-background">
      {/* <AppHeader /> */}

      <div className="absolute top-4 left-4 hidden items-center gap-2 text-lg font-bold md:flex">
        <img src="/images/logo.png" className="mr-3 size-10 object-contain" />
        HD
      </div>
      <section className="flex h-svh gap-8 p-2 pt-16 md:pt-2">
        {/* Form */}
        <div className="md:flex-rows flex h-full w-full flex-col items-center gap-4 overflow-y-auto pt-12 md:w-1/2 md:items-center md:justify-center md:px-6 md:pt-0 lg:w-[45%]">
          <div className="flex items-center gap-2 text-lg font-bold md:hidden">
            <img
              src="/images/logo.png"
              className="mr-3 size-10 object-contain"
            />
            HD
          </div>
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
