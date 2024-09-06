const WarningBar = ({ message }) => (
    <div className="mt-3 bg-yellow-500 text-yellow-900 p-4 rounded-md shadow-md mb-6">
        <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 21.667c-5.34 0-9.667-4.327-9.667-9.667S6.66 2.333 12 2.333 21.667 6.66 21.667 12 17.34 21.667 12 21.667zm-.833-6.833h1.666v-1.666h-1.666v1.666zm0-3.333h1.666v-6.667h-1.666v6.667z"/>
            </svg>
            <p className="font-semibold">{message}</p>
        </div>
    </div>
);

export default WarningBar;
