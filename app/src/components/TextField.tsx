import { FormEvent, ReactNode, useRef } from "react";
import styled from "styled-components";
import eyeIcon from "../assets/eye-icon.svg";

const TextfieldWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
  text-align: left;
  position: relative;
`;

const ViewPass = styled.button`
  background: none;
  position: absolute;
  right: 18px;
  bottom: 6px;
  box-sizing: content-box;
  padding: 0;
`;

const LabelArea = styled.div`
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 10px;
  line-height: 16px;
  margin-bottom: 4px;
`;

const LeftLabel = styled.label`
  margin-left: 8px;
  color: #57627b;
`;

const RightLabel = styled.label`
  margin-right: 8px;
  color: #151a30;
`;

const SInput = styled.input<{ type?: string }>`
  width: 100%;
  height: 40px;
  padding: 10px 16px;
  font-size: 14px;
  color: #57627b;
  border-radius: 8px;
  border: 1px solid #c5cee0;
  background: #ffffff;
  box-sizing: border-box;
  &:disabled {
    background: #edf1f7;
  }
  padding-right: ${(props) => (props.type === "password" ? "40px" : "16px")};
`;

const ChildrenNode = styled.div`
  position: absolute;
  bottom: 11px;
  left: 16px;
`;

const FillBtn = styled.button`
  background: #eef3fb;
  border-radius: 8px;
  font-weight: bold;
  font-size: 10px;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #57627b;
  padding: 2px 8px;
  position: absolute;
  right: 10px;
  top: 30px;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 10px;
  position: absolute;
  left: 0;
  bottom: -15px;
`;

type TProps = {
  label: string;
  children?: ReactNode;
  rightLabel?: string;
  fillBtnText?: string;
  onClickFillBtn?: (e: FormEvent<HTMLButtonElement>) => void;
  icon?: string;
  errorMsg?: string;
  inputProps: {
    name?: string;
    type?: string;
    disabled?: boolean;
    onChange?: (e: FormEvent<HTMLInputElement>) => void;
    value?: any;
    min?: string | number;
    max?: string | number;
  };
};

export default function TextField({
  label,
  rightLabel,
  children,
  inputProps,
  fillBtnText,
  errorMsg,
  onClickFillBtn,
}: TProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleViewPass = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.type === "password") {
      inputRef.current.type = "text";
    } else if (inputRef.current) {
      inputRef.current.type = "password";
    }
  };

  return (
    <TextfieldWrapper>
      <LabelArea>
        <LeftLabel>{label}</LeftLabel>
        {rightLabel ? <RightLabel>{rightLabel}</RightLabel> : null}
      </LabelArea>
      {children ? <ChildrenNode>{children}</ChildrenNode> : null}
      {fillBtnText ? (
        <FillBtn onClick={onClickFillBtn}>{fillBtnText}</FillBtn>
      ) : null}
      {inputProps.type === "password" ? (
        <ViewPass type="button" onClick={toggleViewPass}>
          <img className="passwordIcon" src={eyeIcon} alt={label} />
        </ViewPass>
      ) : null}
      <SInput ref={inputRef} {...inputProps} />
      {errorMsg ? <ErrorText>{errorMsg}</ErrorText> : null}
    </TextfieldWrapper>
  );
}
