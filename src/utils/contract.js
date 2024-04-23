import { ethers } from 'ethers';

/**
 * Retrieves the environment variables and prepares the ABI and Contract Address.
 * Ensure to define REACT_APP_CONTRACT_ADDRESS in your .env file with the deployed contract address.
 */
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const contractABI = [
    "function addTask(string memory _content) public",
    "function completeTask(uint256 _taskId) public",
    "function getTaskCount() public view returns (uint256)",
    "function getTask(uint256 _taskId) public view returns (string memory, bool)",
    "event TaskAdded(uint256 taskId, string content)",
    "event TaskCompleted(uint256 taskId)"
];

/**
 * Initializes and returns a contract instance connected to the writable signed provider.
 * @returns {ethers.Contract} Returns the Contract instance for interacting with the smart contract.
 */
export const getContract = () => {
    const { ethereum } = window;

    if (!ethereum) {
        console.error('Ethereum object not found, install MetaMask.');
        return null;
    }

    try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        return contract;
    } catch (error) {
        console.error('Failed to create contract:', error);
        return null;
    }
};
