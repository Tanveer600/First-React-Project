namespace TransactionProject.Models
{
    public class ResponseDataModel
    {
        public bool IsSuccess { get; set; }
        public string? Message { get; set; }
        public Exception ? ErrorResponse { get; set; }
        public IEnumerable<object>? Data { get; set; }
    }
}
