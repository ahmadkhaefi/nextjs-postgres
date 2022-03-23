import styled from 'styled-components'

export default styled.button`
	border-radius: 5px;
	border: none;
	padding: 10px 15px;
	font-size: 14px;
	background-color: #6f9400;
	color: white;
	transition: filter 0.1s linear;
	:active {
		filter: grayscale(35%);
	}
`
