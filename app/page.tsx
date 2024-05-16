import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline';

function HomePage() {
    return (
        <div className="bg-white text-gray-800 min-h-screen flex flex-col justify-center items-center py-20 px-4">
            <h1 className="text-5xl font-bold mb-10">I am JoseGPT</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-gray-100">
                    <SunIcon className="h-8 w-8 mb-2 text-yellow-500" />
                    <h2 className="text-xl font-bold mb-3">Examples</h2>
                    <div className="space-y-2">
                        <p className="infoText">Explain something to me</p>
                        <p className="infoText">What is the difference between a dog and a cat</p>
                        <p className="infoText">What is the color of the sun</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-gray-100">
                    <BoltIcon className="h-8 w-8 mb-2 text-blue-500" />
                    <h2 className="text-xl font-bold mb-3">Capabilities</h2>
                    <div className="space-y-2">
                        <p className="infoText">Help me in my programming</p>
                        <p className="infoText">How do messages stored in firebase</p>
                        <p className="infoText">How to host a website</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-gray-100">
                    <ExclamationTriangleIcon className="h-8 w-8 mb-2 text-red-500" />
                    <h2 className="text-xl font-bold mb-3">Limitations</h2>
                    <div className="space-y-2">
                        <p className="infoText">May occasionally generate incorrect information</p>
                        <p className="infoText">May occasionally produce harmful instructions or biased content</p>
                        <p className="infoText">Limited knowledge of world</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
