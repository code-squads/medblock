import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";

import { ReactComponent as UploadLogo } from "../assets/icons/hospital/upload.svg";
import { ReactComponent as FileIcon } from "../assets/icons/hospital/pdficon.svg";
import { ReactComponent as DeleteIcon } from "../assets/icons/hospital/delete.svg";

import CloudUploadLogo from "../assets/icons/hospital/cloudUpload.svg";

const Container = styled.div`
  display: flex;
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: auto;
  width: 450px;
  height: auto;
  z-index: 4;
  font-size: "Inter";
  border-radius: 3px;
  background-color: #dcdcdc;
  @media (max-width: 500px) {
    width: 90%;
  }
`;

export const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0px;
  left: 0px;
  opacity: 0.25;
  z-index: 3;
  background-color: #000000;
`;

export const HeadingContainer = styled.div`
  height: 70px;
  background-color: #273748;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 25px;
`;

export const ModalName = styled.div`
  font-weight: 400;
  font-size: 20px;
`;

export const ModalSubHeading = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: #505050;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const UploadSec = styled.section`
  text-align: center;
  padding: 1rem;
  margin-bottom: 5px;
  background-color: #e5e5e5;
  border-radius: 10px;
  border-style: dashed;
  border-width: medium;
  border-color: #c9c9c9;
  color: #9f9f9f;
  font-size: 16px;
  cursor: pointer;
`;

const UploadInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-width: 370px;
`;

const UploadParagraph = styled.p`
  font-size: 16px;
  margin-top: 0.5rem;
`;

const FileDisplayContainer = styled.div`
  margin: 0 1rem 1rem;
`;

const FileHeading = styled.p`
  font-weight: 300;
  color: #808080;
`;

const FilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 120px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 8px;
    border: #c9c9c9 solid 1px;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #c9c9c9;
    border-radius: 5px;
  }
`;

const IndividualFile = styled.div`
  background-color: #fff;
  margin-bottom: 0.8rem;
  border-radius: 5px;
  box-shadow: 2px 1px 5px 1px #c9c9c9;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FileName = styled.div`
  font-size: 14px;
  padding-left: 3px;
  color: #757575;
`;

const DeleteLogo = styled.div`
  cursor: pointer;
  padding-right: 10px;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-right: 10px;
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: ${(props) => (props.bgcolor ? props.bgcolor : "#C93636")};
  color: white;
  font-size: 12px;
  &:hover {
    filter: brightness(97%);
  }
  cursor: pointer;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-around;
  height: 50px;
  margin-top: auto;
  background-color: #dcdcdc;
  border-top: solid #cacaca 1px;
  margin-top: 10px;
`;

export const ModalUpload = (props) => {
    const { closeModal, uploadedFiles, uploadFileHandler } = props;

    const [files, setFiles] = useState(uploadedFiles);

    useEffect(() => {
        console.log(files);
        // uploadFileHandler(files);
        fileSubmitter();
    }, [files]);

    const fileSubmitter = () => {
        uploadFileHandler(files);
    };

    const deleteFile = (index) => {
        const currFiles = [...files];
        currFiles.splice(index, 1);
        setFiles(currFiles);
    };

    const cancelHandler = () => {
        uploadFileHandler([]);
        closeModal();
    };

    const uploadHandler = () => {
        uploadFileHandler(files);
        closeModal();
    };

    const uploadFiles = (newFiles) => {
        const totalFiles = [...files, ...newFiles];
        setFiles(totalFiles);
    };

    return (
        <Container>
            <ModalContainer>
                <HeadingContainer>
                    <ModalName>
                        <UploadLogo />
                        &nbsp;Upload Files
                    </ModalName>
                </HeadingContainer>

                <ModalSubHeading>
                    <Dropzone
                        onDrop={(acceptedFiles) => {
                            uploadFiles(acceptedFiles);
                            console.log(acceptedFiles);
                        }}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <UploadSec>
                                <UploadInputDiv {...getRootProps()}>
                                    <img src={CloudUploadLogo} alt="" />
                                    <input accept="image/*,.pdf" {...getInputProps()} />
                                    <UploadParagraph>
                                        Drag and drop or click to upload
                                    </UploadParagraph>
                                </UploadInputDiv>
                            </UploadSec>
                        )}
                    </Dropzone>
                </ModalSubHeading>

                {files.length > 0 && (
                    <FileDisplayContainer>
                        <FileHeading>Uploaded files:</FileHeading>
                        <FilesContainer>
                            {files.map((file, index) => (
                                <IndividualFile key={file.name} id={index}>
                                    <FileName>
                                        <FileIcon /> {file.name}
                                    </FileName>
                                    <DeleteLogo
                                        onClick={(e) => {
                                            deleteFile(
                                                e.currentTarget.parentElement.getAttribute("id")
                                            );
                                        }}
                                    >
                                        <DeleteIcon />
                                    </DeleteLogo>
                                </IndividualFile>
                            ))}
                        </FilesContainer>
                    </FileDisplayContainer>
                )}

                <ModalFooter>
                    <Button
                        onClick={() => {
                            cancelHandler();
                        }}
                    >
                        Cancel
                    </Button>

                    {files.length > 0 && (
                        <Button
                            bgcolor="#6FD141"
                            style={{ marginLeft: "0px" }}
                            onClick={() => {
                                uploadHandler();
                            }}
                        >
                            Upload
                        </Button>
                    )}
                </ModalFooter>
            </ModalContainer>
        </Container>
    );
};
