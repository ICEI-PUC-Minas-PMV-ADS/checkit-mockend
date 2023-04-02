﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson.IO;
using Tasks.Models;
using Tasks.Services;
namespace Tasks.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TarefasController : ControllerBase
{
    private readonly TarefasService _tarefasCollection;

    public TarefasController(TarefasService tarefasCollection) =>
        _tarefasCollection = tarefasCollection;

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Tarefa>> Get(string id)
    {
        var tarefa = await _tarefasCollection.GetByIdAsync(id);

        if (tarefa is null) return NotFound();

        return tarefa;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Tarefa newTarefa)
    {
        await _tarefasCollection.CreateAsync(newTarefa);

        return CreatedAtAction(nameof(Get), new { id = newTarefa.Id }, newTarefa);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Tarefa updateTarefa)
    {
        var tarefa = await _tarefasCollection.GetByIdAsync(id);

        if (tarefa is null) return NotFound();

        updateTarefa.Id = tarefa.Id;

        await _tarefasCollection.UpdateAsync(id, updateTarefa);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var tarefaDB = await _tarefasCollection.GetByIdAsync(id);

        if (tarefaDB is null) return NotFound();

        await _tarefasCollection.RemoveAsync(id);

        return NoContent();
    }
}