import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'


export default function Landing() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/register')
  }

  return (
    <>
    <header className="dark:bg-secondaryBlack inset-0 flex min-h-[80dvh] w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <div className="mx-auto w-container max-w-full px-5 py-[110px] text-center lg:py-[150px]">
        <h1 className="text-3xl font-heading md:text-4xl lg:text-5xl">
          <span className="text-primary">Whisp</span> - Chat Discreetly
        </h1>
        <p className="my-12 mt-8 text-lg font-normal leading-relaxed md:text-xl lg:text-2xl lg:leading-relaxed">
          Private, intimate conversations meant for only those who should hear them.
          <br />
          Experience the perfect space for your small group chats with enhanced privacy.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl"
          >
            Get started
          </Button>
          <Button
            variant="neutral"
            size="lg"
            className="h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl"
            onClick={() => navigate('github.com')}
          >
            Learn more
          </Button>
        </div>
        <div className="mt-10">
          <p className="text-sm text-muted-foreground">
            Your conversations are end-to-end encrypted and protected.
          </p>
        </div>
      </div>
    </header>
    <footer className="m500:text-sm dark:bg-secondaryBlack z-30 bg-white px-5 py-5 text-center font-base">
    Released under MIT License. The source code is available on{' '}
    <a
      target="_blank"
      href="https://github.com/neobrutalism-templates/saas"
      className="font-heading underline"
    >
      Github
    </a>
    .
  </footer>
  </>
  )
}