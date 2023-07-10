from dotenv import load_dotenv
from langchain.callbacks import get_openai_callback
from langchain.chains.question_answering import load_qa_chain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from PyPDF2 import PdfReader
import streamlit as st


def main():
    # Load environment
    load_dotenv()

    # Basic Streamlit configuration
    st.set_page_config(page_title="PDF Chat")
    st.header("Query your PDF")

    # Upload PDF file
    pdf = st.file_uploader("Upload your PDF", type="pdf")

    # Make sure the PDF file exists
    if (pdf):
        pdf_reader = PdfReader(pdf)
        text = ""

        # Extract the text page by page
        for page in pdf_reader.pages:
            text += page.extract_text()

        # Split text into chunks (for generating embeddings)
        text_splitter = CharacterTextSplitter(
            separator="\n",
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )

        chunks = text_splitter.split_text(text)

        # Convert chunks into embeddings
        embeddings = OpenAIEmbeddings()

        # Use Facebook AI Similarity Search to create a knowledge base
        knowledge_base = FAISS.from_texts(chunks, embeddings)

        # User input
        user_question = st.text_input("Ask a question about your PDF!")
        if (user_question):
            docs = knowledge_base.similarity_search(user_question)

            llm = OpenAI()

            chain = load_qa_chain(llm, chain_type="stuff")

            with get_openai_callback() as cb:
                response = chain.run(input_documents=docs,
                                     question=user_question)
                print(cb)

            st.write(response)


if __name__ == "__main__":
    main()