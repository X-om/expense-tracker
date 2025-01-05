import { Button } from "@nextui-org/react"
function App() {

  return (
    <div className="flex bg-black justify-center h-screen">
          <div className="flex flex-col justify-center">
            <Button color="primary" isLoading  size="lg" radius="full">Downloading</Button>
          </div>
    </div>
  )
}

export default App
