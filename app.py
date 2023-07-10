# from dotenv import load_dotenv
# from flask import Flask, jsonify, request
# from PyPDF2 import PdfReader
# from langchain.text_splitter import CharacterTextSplitter
# from langchain.embeddings.openai import OpenAIEmbeddings
# from langchain.vectorstores import FAISS
# from langchain.chains.question_answering import load_qa_chain
# from langchain.llms import OpenAI
# from langchain.callbacks import get_openai_callback
# import os

# os.environ['OPENAI_API_KEY'] = "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"

# pdf_paths = {
#     '10Science_Science': 'X_Science_Science.pdf',
#     '11History_Theme': 'XI_History_ThemesInWorldHistory.pdf',
#     '11Chemistry_P1':'XI_ChemistryP1.pdf',
#     '11Biology':'XI_Biology.pdf'
#     # Add more keys and corresponding PDF paths as needed
# }

# app = Flask(__name__)

# @app.route('/grade_ans/<pdf>/<query>')
# def grade_answer(pdf=None, query=None):
#     key = pdf_paths.get(pdf)
#     if not key:
#         return jsonify(message="Key is missing."), 400

#     # Get the corresponding PDF path from the dictionary
#     pdf_path = r"C:\Users\Ayushman\OneDrive\Desktop\lang\{}".format(key)
#     if not pdf_path:
#         return jsonify(message="Invalid key."), 400

#     # Pre-set question
#     question = request.args.get('query')

#     pdf_reader = PdfReader(pdf_path)
#     text = ""
#     for page in pdf_reader.pages:
#         text += page.extract_text()

#     # Split into chunks
#     text_splitter = CharacterTextSplitter(
#         separator="\n",
#         chunk_size=1000,
#         chunk_overlap=200,
#         length_function=len
#     )
#     chunks = text_splitter.split_text(text)

#     # Create embeddings
#     embeddings = OpenAIEmbeddings()
#     knowledge_base = FAISS.from_texts(chunks, embeddings)

#     docs = knowledge_base.similarity_search(question)
#     llm = OpenAI()
#     chain = load_qa_chain(llm, chain_type="stuff")
#     with get_openai_callback() as cb:
#         response = chain.run(input_documents=docs, question=question)
#     return jsonify(message=response)

# if __name__ == 'main':
#     load_dotenv()
#     os.environ['OPENAI_API_KEY'] = "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"
#     app.run()