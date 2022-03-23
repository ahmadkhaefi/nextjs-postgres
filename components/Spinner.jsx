import styled from 'styled-components'

export default styled.div`
	border: 4px solid #f3f3f3;
	border-top: 4px solid #6f9400;
	border-radius: 50%;
	width: 25px;
	height: 25px;
	animation: spin 1s linear infinite;
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`
