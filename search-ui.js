let currentFiles = []; // Guardar os arquivos carregados da pasta

window.listarProjetos = async () => {
    fileList.innerHTML = '<p class="text-gray-400 flex items-center justify-center col-span-full"><i class="fas fa-spinner fa-spin mr-2"></i>Buscando arquivos...</p>';
    listModal.style.display = 'flex';
    const folderId = FOLDER_IDS[currentDifficulty];

    try {
        let files = await fetchFiles(folderId);

        // Normaliza os nomes
        files = files.map(f => ({
            ...f,
            _name: (f.name ?? f.title ?? f.filename ?? f.originalFilename ?? f.id ?? '').toString()
        }));

        // Ordena natural
        const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
        files.sort((a, b) => collator.compare(a._name, b._name));

        // Guarda globalmente
        currentFiles = files;

        // Renderiza a lista inicial
        renderFileList(files);

        // Ativa a pesquisa
        const searchBar = document.getElementById('search-bar');
        searchBar.value = '';
        searchBar.oninput = (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = currentFiles.filter(f => f._name.toLowerCase().includes(query));
            renderFileList(filtered);
        };

    } catch (error) {
        fileList.className = '';
        fileList.innerHTML = `<p class="text-red-400 col-span-full text-center">${error.message}</p>`;
    }
};

function renderFileList(files) {
    fileList.innerHTML = '';
    fileList.className = 'grid grid-cols-2 sm:grid-cols-4 gap-4';

    if (files.length === 0) {
        fileList.innerHTML = `<p class="text-gray-400 col-span-full text-center">Nenhum projeto encontrado.</p>`;
        return;
    }

    files.forEach((file, idx) => {
        const cardItem = document.createElement('div');
        cardItem.dataset.index = idx;
        cardItem.innerHTML = `
            <a href="#" class="block p-2 rounded-lg hover:bg-gray-700/50 transition-colors h-full flex flex-col text-center">
                <img src="${file.thumbnailLink ?? ''}" alt="Miniatura de ${file._name}" class="w-full h-24 object-cover rounded-md mb-2 border border-gray-600">
                <span class="text-orange-400 text-sm break-words mt-auto">${file._name}</span>
            </a>
        `;
        cardItem.onclick = (e) => {
            e.preventDefault();
            mostrarProjetoPorId(file.id ?? file.fileId ?? file);
            listModal.style.display = 'none';
        };
        fileList.appendChild(cardItem);
    });
}

