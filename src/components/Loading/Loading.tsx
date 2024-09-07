import Lottie from 'react-lottie-player'
import loadingAnimation from '@/lottle/loading.json'

const Loading = () => {
    return (
        <div className='absolute w-screen h-screen bg-gray-500 bg-opacity-80'>
            <Lottie
                loop
                animationData={loadingAnimation}
                play
                style={{ width: '100px', height: '100px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />            
        </div>

    )
}

export default Loading